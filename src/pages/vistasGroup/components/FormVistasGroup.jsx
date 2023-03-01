import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Select, Checkbox } from "components";
import { VistasGroupContext } from "../context/vistasGroupContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormVistasGroup = () => {
  const { registrarVistasGroup, vistasgroupActual, actualizarVistasGroup, obtenerVistasGroup } =
    useContext(VistasGroupContext);
  const { enqueueSnackbar } = useSnackbar();
  const { modulosList } = useContext(SelectsContext);
  const { mensaje } = useStateContext();
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const vistasgroupDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      moduloId: 0,
      modulos: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [vistasgroup, setVistasGroup] = useState(vistasgroupDefault);

  useEffect(() => {
    vistasgroupActual ? setVistasGroup(vistasgroupActual) : setVistasGroup(vistasgroupDefault);
  }, [vistasgroupActual, vistasgroupDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", vistasgroup.nombre, "Nombre grupo de vista requerido")) valida = false;
    if (validarSelect("moduloId", vistasgroup.modulos, "Debe seleccionar un módulo")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setVistasGroup({ ...vistasgroup, [name]: checked });
    else if (name === "moduloId") setVistasGroup({ ...vistasgroup, modulos: { id: value }, [name]: value });
    else setVistasGroup({ ...vistasgroup, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setVistasGroup(vistasgroupDefault);
    obtenerVistasGroup(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      vistasgroupActual !== null
        ? actualizarVistasGroup(VistasGroupAEnviar())
        : registrarVistasGroup(VistasGroupAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const VistasGroupAEnviar = () => {
    let vistasgroupTmp = { ...vistasgroup };
    vistasgroupTmp.moduloId = vistasgroup.modulos.id;
    return vistasgroupTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={vistasgroup?.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="moduloId"
            name="moduloId"
            value={vistasgroup?.modulos?.id}
            label="Modulo"
            list={modulosList}
            onChange={handleChange}
            error={error.moduloId}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={vistasgroup?.activo} label="Activo" />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormVistasGroup;
