import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { AvisoDesmontajeContext } from "../context/avisoDesmontajeContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal, formatDateshort } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormAvisoDesmontaje = () => {
  const { registrarAvisoDesmontaje, avisoDesmontajeActual, actualizarAvisoDesmontaje, obtenerAvisoDesmontaje } =
    useContext(AvisoDesmontajeContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const adDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      fecha: "",
      activo: false,
    };
  }, []);

  const [ad, setAd] = useState(adDefault);

  useEffect(() => {
    avisoDesmontajeActual !== null ? setAd(avisoDesmontajeActual) : setAd(adDefault);
  }, [avisoDesmontajeActual, adDefault]);

  const validaciones = () => {
    let valida = true;
    if (validarTexto("nombre", ad.nombre, "Nombre Requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    type === "checkbox" ? setAd({ ...ad, [name]: checked }) : setAd({ ...ad, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setAd(adDefault);
    obtenerAvisoDesmontaje(null);
    setError([]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError(validaciones(ad));

    if (Object.keys(error).length === 0) {
      avisoDesmontajeActual !== null ? actualizarAvisoDesmontaje(AdAEnviar()) : registrarAvisoDesmontaje(AdAEnviar());
      limpiaForm();
      closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const AdAEnviar = () => {
    let adTmp = { ...ad };
    return adTmp;
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
            value={ad?.nombre}
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
            value={formatDateshort(ad?.fecha)}
            onChangeFN={handleChange}
            onBlur={handleChange}
            //required={true}
            error={error?.fecha}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={ad?.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormAvisoDesmontaje;
