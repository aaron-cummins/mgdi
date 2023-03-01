import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { ZonaContext } from "../context/zonaContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormZona = () => {
  const { registrarZona, zonaActual, actualizarZona, obtenerZona } = useContext(ZonaContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { paisList } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const zonaDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      paisId: 0,
      pais: {
        nombre: "",
      },
      activo: false,
    };
  }, []);

  const [zona, setZona] = useState(zonaDefault);

  useEffect(() => {
    zonaActual ? setZona(zonaActual) : setZona(zonaDefault);
  }, [zonaActual, zonaDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", zona.nombre, "Nombre de zona requerido")) valida = false;
    if (validarSelect("paisId", zona.pais, "Debe seleccionar un país")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setZona({ ...zona, [name]: checked });
    else if (name === "paisId") setZona({ ...zona, pais: { id: value }, [name]: value });
    else setZona({ ...zona, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setZona(zonaDefault);
    obtenerZona(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      zonaActual !== null ? actualizarZona(ZonaAEnviar()) : registrarZona(ZonaAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const ZonaAEnviar = () => {
    let zonaTmp = { ...zona };
    zonaTmp.paisId = zona.pais.id;
    return zonaTmp;
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
            value={zona.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="paisId"
            name="paisId"
            value={zona.pais?.id}
            onChange={handleChange}
            label="País"
            list={paisList}
            required={true}
            error={error.paisId}
          />
        </div>
      </div>

      <div className="form-group gap-4">
        <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={zona.activo} />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormZona;
