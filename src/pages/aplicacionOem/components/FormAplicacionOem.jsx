import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { AplicacionOemContext } from "../context/aplicacionOemContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormAplicacionOem = () => {
  const { aplicacionOemActual, registrarAplicacionOem, actualizarAplicacionOem, obtenerAplicacionOem } =
    useContext(AplicacionOemContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const aplicacionoemDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [aplicacionoem, setAplicacionOem] = useState(aplicacionoemDefault);

  useEffect(() => {
    aplicacionOemActual ? setAplicacionOem(aplicacionOemActual) : setAplicacionOem(aplicacionoemDefault);
  }, [aplicacionOemActual, aplicacionoemDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", aplicacionoem.nombre, "Nombre aplicación oem")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setAplicacionOem({ ...aplicacionoem, [name]: checked });
    else setAplicacionOem({ ...aplicacionoem, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setAplicacionOem(aplicacionoemDefault);
    obtenerAplicacionOem(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      aplicacionOemActual !== null
        ? actualizarAplicacionOem(AplicacionOemAEnviar())
        : registrarAplicacionOem(AplicacionOemAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const AplicacionOemAEnviar = () => {
    let aplicacionoemTmp = { ...aplicacionoem };
    return aplicacionoemTmp;
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
            value={aplicacionoem?.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox
            id="activo"
            name="activo"
            label="Activo"
            onChangeFN={handleChange}
            checked={aplicacionoem?.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormAplicacionOem;
