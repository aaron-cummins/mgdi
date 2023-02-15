import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { PostTratamientoContext } from "../context/PostTratamientoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormPostTratamiento = () => {
  const { PostTratamientoActual, registrarPostTratamiento, actualizarPostTratamiento, obtenerPostTratamiento } =
    useContext(PostTratamientoContext);
  const { mensaje } = useStateContext();
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
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      PostTratamientoActual !== null
        ? actualizarPostTratamiento(PostTratamientoEnviar())
        : registrarPostTratamiento(PostTratamientoEnviar());
      closeModal();
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
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
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
        <div className="form-group mb-4">
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
