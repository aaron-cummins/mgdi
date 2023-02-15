import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { PaisContext } from "../context/paisContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormPais = () => {
  const { registrarPais, paisActual, actualizarPais, obtenerPais } = useContext(PaisContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const paisDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      activo: false,
    };
  }, []);

  const [pais, setPais] = useState(paisDefault);

  useEffect(() => {
    paisActual ? setPais(paisActual) : setPais(paisDefault);
  }, [paisActual, paisDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", pais.nombre, "Nombre del país requerido")) valida = false;
    if (validarTexto("abreviacion", pais.abreviacion, "Abreviación del país requerida")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setPais({ ...pais, [name]: checked });
    else setPais({ ...pais, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setPais(paisDefault);
    obtenerPais(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      paisActual !== null
        ? actualizarPais(PaisAEnviar())
        : registrarPais(PaisAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const PaisAEnviar = () => {
    let paisTmp = { ...pais };
    return paisTmp;
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
            value={pais.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="abreviacion"
            name="abreviacion"
            placeholder="Abreviacion"
            label="Abreviacion"
            value={pais.abreviacion}
            onChangeFN={handleChange}
            required={true}
            error={error.abreviacion}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={pais.activo} />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormPais;
