import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { AvisoMontajeContext } from "../context/avisoMontajeContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormAvisoMontaje = ({ closeModal }) => {
  const { registrarAvisoMontaje, avisoMontajeActual, actualizarAvisoMontaje, obtenerAvisoMontaje } =
    useContext(AvisoMontajeContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, error, setError } = useValidacionForm();

  const amDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      fecha: "",
      activo: false,
    };
  }, []);

  const [am, setAm] = useState(amDefault);

  useEffect(() => {
    avisoMontajeActual !== null ? setAm(avisoMontajeActual) : setAm(amDefault);
  }, [avisoMontajeActual, amDefault]);

  const validaciones = () => {
    let valida = true;
    if (validarTexto("nombre", am.nombre, "Nombre requerido")) valida = false;
    if (validarTexto("fecha", am.fecha, "Fecha requerida")) valida = false;
    return valida;
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
    closeModal();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validaciones()) {
      const amEnv = AmAEnviar();
      console.log(amEnv);
      avisoMontajeActual !== null
        ? actualizarAvisoMontaje(amEnv).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }))
        : registrarAvisoMontaje(amEnv).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }));
      limpiaForm();
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="form-group">
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

        <div className="form-group">
          <InputText
            type="date"
            id="fecha"
            name="fecha"
            placeholder="Fecha"
            label="Fecha"
            value={am?.fecha}
            onChangeFN={handleChange}
            onBlur={handleChange}
            required={true}
            error={error?.fecha}
          />
        </div>
        <div className="form-group">
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
