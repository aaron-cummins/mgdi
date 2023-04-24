import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { MonitoreoFiltroContext } from "../context/monitoreoFiltroContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormMonitoreoFiltro = ({ closeModal }) => {
  const { registrarMonitoreoFiltro, monitoreofiltroActual, actualizarMonitoreoFiltro, obtenerMonitoreoFiltro } =
    useContext(MonitoreoFiltroContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const monitoreofiltroDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [monitoreofiltro, setMonitoreoFiltro] = useState(monitoreofiltroDefault);

  useEffect(() => {
    monitoreofiltroActual !== null
      ? setMonitoreoFiltro(monitoreofiltroActual)
      : setMonitoreoFiltro(monitoreofiltroDefault);
  }, [monitoreofiltroActual, monitoreofiltroDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", monitoreofiltro.nombre, "Nombre de monitoreo filtro requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setMonitoreoFiltro({ ...monitoreofiltro, [name]: checked });
    else setMonitoreoFiltro({ ...monitoreofiltro, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setMonitoreoFiltro(monitoreofiltroDefault);
    obtenerMonitoreoFiltro(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      monitoreofiltroActual !== null
        ? actualizarMonitoreoFiltro(MonitoreoFiltroEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarMonitoreoFiltro(MonitoreoFiltroEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const MonitoreoFiltroEnviar = () => {
    let monitoreofiltroTmp = { ...monitoreofiltro };
    return monitoreofiltroTmp;
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
            value={monitoreofiltro.nombre}
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
            checked={monitoreofiltro.activo}
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

export default FormMonitoreoFiltro;
