import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { EstadoEquipoContext } from "../context/EstadoEquipoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormEstadoEquipo = () => {
  const { EstadoEquipoActual, registrarEstadoEquipo, actualizarEstadoEquipo, obtenerEstadoEquipo } =
    useContext(EstadoEquipoContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const EstadoEquipoDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [EstadoEquipo, setEstadoEquipo] = useState(EstadoEquipoDefault);

  useEffect(() => {
    EstadoEquipoActual ? setEstadoEquipo(EstadoEquipoActual) : setEstadoEquipo(EstadoEquipoDefault);
  }, [EstadoEquipoActual, EstadoEquipoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", EstadoEquipo.nombre, "Nombre de estado equipo requerido")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setEstadoEquipo({ ...EstadoEquipo, [name]: checked });
    else setEstadoEquipo({ ...EstadoEquipo, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setEstadoEquipo(EstadoEquipoDefault);
    obtenerEstadoEquipo(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      EstadoEquipoActual !== null
        ? actualizarEstadoEquipo(EstadoEquipoEnviar())
        : registrarEstadoEquipo(EstadoEquipoEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const EstadoEquipoEnviar = () => {
    let EstadoEquipoTmp = { ...EstadoEquipo };
    return EstadoEquipoTmp;
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
            value={EstadoEquipo.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={EstadoEquipo.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEstadoEquipo;
