import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { AplicacionContext } from "../context/aplicacionContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormAplicacion = ({ closeModal }) => {
  const { registrarAplicacion, aplicacionActual, actualizarAplicacion, obtenerAplicacion } =
    useContext(AplicacionContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const aplicacionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [aplicacion, setAplicacion] = useState(aplicacionDefault);

  useEffect(() => {
    aplicacionActual !== null ? setAplicacion(aplicacionActual) : setAplicacion(aplicacionDefault);
  }, [aplicacionActual, aplicacionDefault]);

  const validaciones = () => {
    let valida = true;
    if (validarTexto("nombre", aplicacion.nombre, "Nombre requerido")) valida = false;
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setAplicacion({ ...aplicacion, [name]: checked });
    else setAplicacion({ ...aplicacion, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setAplicacion(aplicacionDefault);
    obtenerAplicacion(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      aplicacionActual !== null
        ? actualizarAplicacion(AplicacionEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarAplicacion(AplicacionEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const AplicacionEnviar = () => {
    let aplicacionTmp = { ...aplicacion };
    return aplicacionTmp;
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
            value={aplicacion.nombre}
            onChangeFN={handleChange}
            onBlur={handleChange}
            //required={true}
            error={error?.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={aplicacion.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormAplicacion;
