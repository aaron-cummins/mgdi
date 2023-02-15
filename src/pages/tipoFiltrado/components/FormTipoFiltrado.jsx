import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoFiltradoContext } from "../context/tipofiltradoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipoFiltrado = () => {
  const { registrarTipoFiltrado, tipofiltradoActual, actualizarTipoFiltrado, obtenerTipoFiltrado } =
    useContext(TipoFiltradoContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const tipofiltradoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipofiltrado, setTipoFiltrado] = useState(tipofiltradoDefault);

  useEffect(() => {
    tipofiltradoActual ? setTipoFiltrado(tipofiltradoActual) : setTipoFiltrado(tipofiltradoDefault);
  }, [tipofiltradoActual, tipofiltradoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", tipofiltrado.nombre, "Nombre de tipo filtrado requerido")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipoFiltrado({ ...tipofiltrado, [name]: checked });
    else setTipoFiltrado({ ...tipofiltrado, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipoFiltrado(tipofiltradoDefault);
    obtenerTipoFiltrado(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      tipofiltradoActual !== null
        ? actualizarTipoFiltrado(TipoFiltradoAEnviar())
        : registrarTipoFiltrado(TipoFiltradoAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipoFiltradoAEnviar = () => {
    let tipofiltradoTmp = { ...tipofiltrado };
    return tipofiltradoTmp;
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
            value={tipofiltrado.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={tipofiltrado.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoFiltrado;
