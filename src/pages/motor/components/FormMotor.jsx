import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { MotorContext } from "../context/motorContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { SelectsContext } from "contexts/SelectsContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormMotor = () => {
  const { registrarMotor, motorActual, actualizarMotor, obtenerMotor } = useContext(MotorContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const { aplicacionesList } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const motorDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      rangoPotencia: "",
      aplicacionId: 0,
      aplicacion: {
        id: 0,
      },
      activo: false,
    }),
    []
  );

  const [motor, setMotor] = useState(motorDefault);

  useEffect(() => {
    motorActual !== null ? setMotor(motorActual) : setMotor(motorDefault);
  }, [motorActual, motorDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", motor.nombre, "Nombre de motor requerido")) valida = false;
    if (validarTexto("rangoPotencia", motor.rangoPotencia, "Nombre de rango potencia requerido")) valida = false;
    if (validarSelect("aplicacionId", motor.aplicacion, "Debe seleccionar una aplicación")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setMotor({ ...motor, [name]: checked });
    else if (name === "aplicacionId") setMotor({ ...motor, aplicacion: { id: value }, [name]: value });
    else setMotor({ ...motor, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setMotor(motorDefault);
    obtenerMotor(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      motorActual !== null ? actualizarMotor(MotorEnviar()) : registrarMotor(MotorEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const MotorEnviar = () => {
    let motorTmp = { ...motor };
    motorTmp.aplicacionId = motor.aplicacion.id;
    return motorTmp;
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
            value={motor.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="aplicacionId"
            name="aplicacionId"
            value={motor.aplicacion?.id}
            onChange={handleChange}
            label="aplicacion"
            list={aplicacionesList}
            required={true}
            error={error.aplicacionId}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="rangoPotencia"
            name="rangoPotencia"
            placeholder="Rango de potencia"
            label="Rango de potencia"
            value={motor.rangoPotencia}
            onChangeFN={handleChange}
            required={true}
            error={error.rangoPotencia}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={motor.activo} />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center"></div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormMotor;
