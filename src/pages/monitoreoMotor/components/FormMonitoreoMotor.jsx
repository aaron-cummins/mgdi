import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { MonitoreoMotorContext } from "../context/monitoreoMotorContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormMonitoreoMotor = ({ closeModal }) => {
  const { registrarMonitoreoMotor, monitoreomotorActual, actualizarMonitoreoMotor, obtenerMonitoreoMotor } =
    useContext(MonitoreoMotorContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const monitoreomotorDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [monitoreomotor, setMonitoreoMotor] = useState(monitoreomotorDefault);

  useEffect(() => {
    monitoreomotorActual !== null ? setMonitoreoMotor(monitoreomotorActual) : setMonitoreoMotor(monitoreomotorDefault);
  }, [monitoreomotorActual, monitoreomotorDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", monitoreomotor.nombre, "Nombre de monitoreo motor requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setMonitoreoMotor({ ...monitoreomotor, [name]: checked });
    else setMonitoreoMotor({ ...monitoreomotor, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setMonitoreoMotor(monitoreomotorDefault);
    obtenerMonitoreoMotor(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      monitoreomotorActual !== null
        ? actualizarMonitoreoMotor(MonitoreoMotorEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarMonitoreoMotor(MonitoreoMotorEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const MonitoreoMotorEnviar = () => {
    let monitoreomotorTmp = { ...monitoreomotor };
    return monitoreomotorTmp;
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
            value={monitoreomotor.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox
            id="activo"
            name="activo"
            onChangeFN={handleChange}
            checked={monitoreomotor.activo}
            label="Activo"
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormMonitoreoMotor;
