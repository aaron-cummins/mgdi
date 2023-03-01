import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Select, Checkbox } from "components";
import { VistasContext } from "../context/vistasContext";
import { closeModal, formatDate } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormVistas = () => {
  const { registrarVistas, vistasActual, actualizarVistas, obtenerVistasGrouplist, obtenerVistas } =
    useContext(VistasContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { vistasGroupList } = useContext(VistasContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const vistasDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      controller: "",
      accion: "",
      grupoVistasId: 0,
      vistasGroupHelper: {
        id: 0,
      },
      activo: false,
      created_at: formatDate(Date(Date.now)),
      updated_at: formatDate(Date(Date.now)),
    };
  }, []);

  const [vistas, setVistas] = useState(vistasDefault);

  useEffect(() => {
    obtenerVistasGrouplist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    vistasActual ? setVistas(vistasActual) : setVistas(vistasDefault);
  }, [vistasActual, vistasDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", vistas.nombre, "Nombre vistas requerido")) valida = false;
    if (validarSelect("grupoVistasId", vistas.vistasGroupHelper, "Debe selecionar un grupo vistas")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setVistas({ ...vistas, [name]: checked });
    else if (name === "grupoVistasId") setVistas({ ...vistas, vistasGroupHelper: { id: value }, [name]: value });
    else setVistas({ ...vistas, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setVistas(vistasDefault);
    obtenerVistas(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      vistasActual !== null ? actualizarVistas(VistasAEnviar()) : registrarVistas(VistasAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const VistasAEnviar = () => {
    let vistasTmp = { ...vistas };
    vistasTmp.grupoVistasId = vistas.vistasGroupHelper.id;
    return vistasTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={vistas?.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="grupoVistasId"
            name="grupoVistasId"
            value={vistas?.vistasGroupHelper?.id}
            onChange={handleChange}
            label="Grupo vistas"
            list={vistasGroupList}
            error={error.grupoVistasId}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-4">
          <InputText
            id="accion"
            name="accion"
            placeholder="Acción"
            label="Acción"
            value={vistas?.accion}
            onChangeFN={handleChange}
            required={true}
            error={error.accion}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="controller"
            name="controller"
            placeholder="Controller"
            label="Controller"
            value={vistas?.controller}
            onChangeFN={handleChange}
            required={true}
            error={error.controller}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={vistas?.activo} label="Activo" />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormVistas;
