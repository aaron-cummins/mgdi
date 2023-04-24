import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoSalidaContext } from "../context/TipoSalidaContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipoSalida = ({ closeModal }) => {
  const { TipoSalidaActual, registrarTipoSalida, actualizarTipoSalida, obtenerTipoSalida } =
    useContext(TipoSalidaContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const TipoSalidaDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [TipoSalida, setTipoSalida] = useState(TipoSalidaDefault);

  useEffect(() => {
    TipoSalidaActual ? setTipoSalida(TipoSalidaActual) : setTipoSalida(TipoSalidaDefault);
  }, [TipoSalidaActual, TipoSalidaDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", TipoSalida.nombre, "Nombre tipo de salida requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipoSalida({ ...TipoSalida, [name]: checked });
    else setTipoSalida({ ...TipoSalida, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipoSalida(TipoSalidaDefault);
    obtenerTipoSalida(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      TipoSalidaActual !== null
        ? actualizarTipoSalida(TipoSalidaEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarTipoSalida(TipoSalidaEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipoSalidaEnviar = () => {
    let TipoSalidaTmp = { ...TipoSalida };
    return TipoSalidaTmp;
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
            value={TipoSalida.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={TipoSalida.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoSalida;
