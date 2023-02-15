import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { AvisoMontajeContext } from "../context/avisoMontajeContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal, formatDateshort } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormAvisoMontaje = () => {
  const { registrarAvisoMontaje, avisoMontajeActual, actualizarAvisoMontaje, obtenerAvisoMontaje } =
    useContext(AvisoMontajeContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const amDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      fecha: "",
      activo: false,
    };
  }, []);

  const [am, setAm] = useState(amDefault);
  const [error, setError] = useState({});

  useEffect(() => {
    avisoMontajeActual !== null ? setAm(avisoMontajeActual) : setAm(amDefault);
  }, [avisoMontajeActual, amDefault]);

  const validaciones = () => {
    let error = {};
    if (!am.nombre.trim()) error.nombre = "Nombre Requerido";

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    type === "checkbox" ? setAm({ ...am, [name]: checked }) : setAm({ ...am, [name]: value });

    setError(validaciones());
  };

  const limpiaForm = () => {
    setAm(amDefault);
    obtenerAvisoMontaje(null);
    setError({});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError(validaciones(am));

    if (Object.keys(error).length === 0) {
      avisoMontajeActual !== null ? actualizarAvisoMontaje(AmAEnviar()) : registrarAvisoMontaje(AmAEnviar());
      limpiaForm();
      closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const AmAEnviar = () => {
    let amTmp = { ...am };
    return amTmp;
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
            value={am?.nombre}
            onChangeFN={handleChange}
            onBlur={handleChange}
            //required={true}
            error={error?.nombre}
          />
        </div>

        <div className="form-group mb-8">
          <InputText
            type="date"
            id="fecha"
            name="fecha"
            placeholder="Fecha"
            label="Fecha"
            value={formatDateshort(am?.fecha)}
            onChangeFN={handleChange}
            onBlur={handleChange}
            //required={true}
            error={error?.fecha}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={am?.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormAvisoMontaje;
