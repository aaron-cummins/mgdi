import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { FuenteInformacionContext } from "../context/FuenteInformacionContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormFuenteInformacion = ({ closeModal }) => {
  const { FuenteInformacionActual, registrarFuenteInformacion, actualizarFuenteInformacion, obtenerFuenteInformacion } =
    useContext(FuenteInformacionContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const FuenteInformacionDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [FuenteInformacion, setFuenteInformacion] = useState(FuenteInformacionDefault);

  useEffect(() => {
    FuenteInformacionActual
      ? setFuenteInformacion(FuenteInformacionActual)
      : setFuenteInformacion(FuenteInformacionDefault);
  }, [FuenteInformacionActual, FuenteInformacionDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", FuenteInformacion.nombre, "Nombre de la fuente de información requerido"))
      valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setFuenteInformacion({ ...FuenteInformacion, [name]: checked });
    else setFuenteInformacion({ ...FuenteInformacion, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setFuenteInformacion(FuenteInformacionDefault);
    obtenerFuenteInformacion(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      FuenteInformacionActual !== null
        ? actualizarFuenteInformacion(FuenteInformacionEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarFuenteInformacion(FuenteInformacionEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const FuenteInformacionEnviar = () => {
    let FuenteInformacionTmp = { ...FuenteInformacion };
    return FuenteInformacionTmp;
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
            value={FuenteInformacion.nombre}
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
            checked={FuenteInformacion.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormFuenteInformacion;
