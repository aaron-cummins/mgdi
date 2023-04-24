import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { EstadoMotorInstalacionContext } from "../context/EstadoMotorInstalacionContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormEstadoMotorInstalacion = ({ closeModal }) => {
  const {
    EstadoMotorInstalacionActual,
    registrarEstadoMotorInstalacion,
    actualizarEstadoMotorInstalacion,
    obtenerEstadoMotorInstalacion,
  } = useContext(EstadoMotorInstalacionContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const EstadoMotorInstalacionDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [EstadoMotorInstalacion, setEstadoMotorInstalacion] = useState(EstadoMotorInstalacionDefault);

  useEffect(() => {
    EstadoMotorInstalacionActual
      ? setEstadoMotorInstalacion(EstadoMotorInstalacionActual)
      : setEstadoMotorInstalacion(EstadoMotorInstalacionDefault);
  }, [EstadoMotorInstalacionActual, EstadoMotorInstalacionDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", EstadoMotorInstalacion.nombre, "Nombre requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setEstadoMotorInstalacion({ ...EstadoMotorInstalacion, [name]: checked });
    else setEstadoMotorInstalacion({ ...EstadoMotorInstalacion, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setEstadoMotorInstalacion(EstadoMotorInstalacionDefault);
    obtenerEstadoMotorInstalacion(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      EstadoMotorInstalacionActual !== null
        ? actualizarEstadoMotorInstalacion(EstadoMotorInstalacionEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarEstadoMotorInstalacion(EstadoMotorInstalacionEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const EstadoMotorInstalacionEnviar = () => {
    let EstadoMotorInstalacionTmp = { ...EstadoMotorInstalacion };
    return EstadoMotorInstalacionTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={EstadoMotorInstalacion.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox
            id="activo"
            name="activo"
            label="Activo"
            onChangeFN={handleChange}
            checked={EstadoMotorInstalacion.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEstadoMotorInstalacion;
