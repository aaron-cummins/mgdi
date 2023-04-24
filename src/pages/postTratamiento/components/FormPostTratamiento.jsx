import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { PostTratamientoContext } from "../context/PostTratamientoContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormPostTratamiento = ({ closeModal }) => {
  const { PostTratamientoActual, registrarPostTratamiento, actualizarPostTratamiento, obtenerPostTratamiento } =
    useContext(PostTratamientoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const PostTratamientoDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [PostTratamiento, setPostTratamiento] = useState(PostTratamientoDefault);

  useEffect(() => {
    PostTratamientoActual ? setPostTratamiento(PostTratamientoActual) : setPostTratamiento(PostTratamientoDefault);
  }, [PostTratamientoActual, PostTratamientoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", PostTratamiento.nombre, "Nombre de posttratamiento requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setPostTratamiento({ ...PostTratamiento, [name]: checked });
    else setPostTratamiento({ ...PostTratamiento, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setPostTratamiento(PostTratamientoDefault);
    obtenerPostTratamiento(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      PostTratamientoActual !== null
        ? actualizarPostTratamiento(PostTratamientoEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarPostTratamiento(PostTratamientoEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const PostTratamientoEnviar = () => {
    let PostTratamientoTmp = { ...PostTratamiento };
    return PostTratamientoTmp;
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
            value={PostTratamiento.nombre}
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
            checked={PostTratamiento.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormPostTratamiento;
