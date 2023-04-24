import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoInyeccionContext } from "../context/tipoinyeccionContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipoInyeccion = ({ closeModal }) => {
  const { registrarTipoInyeccion, tipoinyeccionActual, actualizarTipoInyeccion, obtenerTipoInyeccion } =
    useContext(TipoInyeccionContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const tipoinyeccionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipoinyeccion, setTipoInyeccion] = useState(tipoinyeccionDefault);

  useEffect(() => {
    tipoinyeccionActual ? setTipoInyeccion(tipoinyeccionActual) : setTipoInyeccion(tipoinyeccionDefault);
  }, [tipoinyeccionActual, tipoinyeccionDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", tipoinyeccion.nombre, "Nombre de tipo inyección requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipoInyeccion({ ...tipoinyeccion, [name]: checked });
    else setTipoInyeccion({ ...tipoinyeccion, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipoInyeccion(tipoinyeccionDefault);
    obtenerTipoInyeccion(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      tipoinyeccionActual !== null
        ? actualizarTipoInyeccion(TipoInyeccionAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarTipoInyeccion(TipoInyeccionAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipoInyeccionAEnviar = () => {
    let tipoinyeccionTmp = { ...tipoinyeccion };
    return tipoinyeccionTmp;
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
            value={tipoinyeccion.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={tipoinyeccion.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoInyeccion;
