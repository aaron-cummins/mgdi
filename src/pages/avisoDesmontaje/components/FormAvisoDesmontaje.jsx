import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { AvisoDesmontajeContext } from "../context/avisoDesmontajeContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormAvisoDesmontaje = ({ closeModal }) => {
  const { registrarAvisoDesmontaje, avisoDesmontajeActual, actualizarAvisoDesmontaje, obtenerAvisoDesmontaje } =
    useContext(AvisoDesmontajeContext);
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
    if (validarTexto("fecha", ad.fecha, "Fecha requerida")) valida = false;
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    type === "checkbox" ? setAd({ ...ad, [name]: checked }) : setAd({ ...ad, [name]: value });
    type === "select-one" ? validarNumero(name, value) : validarTexto(name, value);
  };

  const limpiaForm = () => {
    setAd(adDefault);
    obtenerAvisoDesmontaje(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validaciones()) {
      avisoDesmontajeActual !== null
        ? actualizarAvisoDesmontaje(AdAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarAvisoDesmontaje(AdAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );
      limpiaForm();
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
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <div className="grid grid-col-1 md:grid-cols-3 gap-4 mb-4">
        <div className="form-group">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={ad?.nombre}
            onChangeFN={(e) => handleChange(e)}
            //required={true}
            error={error?.nombre}
          />
        </div>

        <div className="form-group">
          <InputText
            type="date"
            id="fecha"
            name="fecha"
            placeholder="Fecha"
            label="Fecha"
            value={ad?.fecha}
            onChangeFN={(e) => handleChange(e)}
            required={true}
            error={error?.fecha}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" onChangeFN={(e) => handleChange(e)} checked={ad?.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormAvisoDesmontaje;
