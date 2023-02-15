import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { UbContext } from "../context/ubContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormUb = () => {
  const { registrarUb, ubActual, actualizarUb, obtenerUb } = useContext(UbContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const ubDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      procesamiento: "",
      activo: false,
    };
  }, []);

  const [ub, setUb] = useState(ubDefault);

  useEffect(() => {
    ubActual !== null ? setUb(ubActual) : setUb(ubDefault);
  }, [ubActual, ubDefault]);

  const validaciones = () => {
    let valida = true;
    if (validarTexto("nombre", ub.nombre, "Nombre Requerido")) valida = false;
    if (validarTexto("procesamiento", ub.procesamiento, "Procesamiento Requerido")) valida = false;
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    type === "checkbox" ? setUb({ ...ub, [name]: checked }) : setUb({ ...ub, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setUb(ubDefault);
    obtenerUb(null);
    setError({});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validaciones()) {
      ubActual !== null ? actualizarUb(UbAEnviar()) : registrarUb(UbAEnviar());
      limpiaForm();
      closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const UbAEnviar = () => {
    let ubTmp = { ...ub };
    return ubTmp;
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
            value={ub?.nombre}
            onChangeFN={handleChange}
            onBlur={handleChange}
            //required={true}
            error={error?.nombre}
          />
        </div>

        <div className="form-group mb-8">
          <InputText
            id="procesamiento"
            name="procesamiento"
            placeholder="Procesamiento"
            label="Procesamiento"
            value={ub?.procesamiento}
            onChangeFN={handleChange}
            onBlur={handleChange}
            //required={true}
            error={error?.procesamiento}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={ub?.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormUb;
