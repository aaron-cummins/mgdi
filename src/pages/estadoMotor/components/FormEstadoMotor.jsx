import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, Switch } from "components";
import { EstadoMotorContext } from "../context/EstadoMotorContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormEstadoMotor = ({ closeModal }) => {
  const { EstadoMotorActual, registrarEstadoMotor, actualizarEstadoMotor, obtenerEstadoMotor } =
    useContext(EstadoMotorContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const EstadoMotorDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
      montaje: false,
    }),
    []
  );
  const [EstadoMotor, setEstadoMotor] = useState(EstadoMotorDefault);

  useEffect(() => {
    EstadoMotorActual ? setEstadoMotor(EstadoMotorActual) : setEstadoMotor(EstadoMotorDefault);
  }, [EstadoMotorActual, EstadoMotorDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", EstadoMotor.nombre, "Nombre de estado motor requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    type === "checkbox"
      ? setEstadoMotor({ ...EstadoMotor, [name]: checked })
      : setEstadoMotor({ ...EstadoMotor, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setEstadoMotor(EstadoMotorDefault);
    obtenerEstadoMotor(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      EstadoMotorActual !== null
        ? actualizarEstadoMotor(EstadoMotorEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarEstadoMotor(EstadoMotorEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const EstadoMotorEnviar = () => {
    let EstadoMotorTmp = { ...EstadoMotor };
    return EstadoMotorTmp;
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
            value={EstadoMotor.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Switch
            label="montaje"
            id="montaje"
            name="montaje"
            onChange={handleChange}
            checked={EstadoMotor.montaje}></Switch>
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={EstadoMotor.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEstadoMotor;
