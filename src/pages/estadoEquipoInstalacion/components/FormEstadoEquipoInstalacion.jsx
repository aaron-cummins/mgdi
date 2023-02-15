import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { EstadoEquipoInstalacionContext } from "../context/EstadoEquipoInstalacionContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormEstadoEquipoInstalacion = () => {
  const {
    EstadoEquipoInstalacionActual,
    registrarEstadoEquipoInstalacion,
    actualizarEstadoEquipoInstalacion,
    obtenerEstadoEquipoInstalacion,
  } = useContext(EstadoEquipoInstalacionContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const EstadoEquipoInstalacionDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [EstadoEquipoInstalacion, setEstadoEquipoInstalacion] = useState(EstadoEquipoInstalacionDefault);

  useEffect(() => {
    EstadoEquipoInstalacionActual
      ? setEstadoEquipoInstalacion(EstadoEquipoInstalacionActual)
      : setEstadoEquipoInstalacion(EstadoEquipoInstalacionDefault);
  }, [EstadoEquipoInstalacionActual, EstadoEquipoInstalacionDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", EstadoEquipoInstalacion.nombre, "Nombre requerido")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setEstadoEquipoInstalacion({ ...EstadoEquipoInstalacion, [name]: checked });
    else setEstadoEquipoInstalacion({ ...EstadoEquipoInstalacion, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setEstadoEquipoInstalacion(EstadoEquipoInstalacionDefault);
    obtenerEstadoEquipoInstalacion(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      EstadoEquipoInstalacionActual !== null
        ? actualizarEstadoEquipoInstalacion(EstadoEquipoInstalacionEnviar())
        : registrarEstadoEquipoInstalacion(EstadoEquipoInstalacionEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const EstadoEquipoInstalacionEnviar = () => {
    let EstadoEquipoInstalacionTmp = { ...EstadoEquipoInstalacion };
    return EstadoEquipoInstalacionTmp;
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
            value={EstadoEquipoInstalacion.nombre}
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
            checked={EstadoEquipoInstalacion.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEstadoEquipoInstalacion;
