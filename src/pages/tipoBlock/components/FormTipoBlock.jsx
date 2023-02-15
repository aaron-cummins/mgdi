import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoBlockContext } from "../context/TipoBlockContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipoBlock = () => {
  const { TipoBlockActual, registrarTipoBlock, actualizarTipoBlock, obtenerTipoBlock } = useContext(TipoBlockContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const TipoBlockDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      experimental: false,
      activo: false,
    }),
    []
  );
  const [TipoBlock, setTipoBlock] = useState(TipoBlockDefault);

  useEffect(() => {
    TipoBlockActual ? setTipoBlock(TipoBlockActual) : setTipoBlock(TipoBlockDefault);
  }, [TipoBlockActual, TipoBlockDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", TipoBlock.nombre, "Nombre de tipo block requerido")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipoBlock({ ...TipoBlock, [name]: checked });
    else setTipoBlock({ ...TipoBlock, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipoBlock(TipoBlockDefault);
    obtenerTipoBlock(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      TipoBlockActual !== null
        ? actualizarTipoBlock(TipoBlockEnviar())
        : registrarTipoBlock(TipoBlockEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipoBlockEnviar = () => {
    let TipoBlockTmp = { ...TipoBlock };
    return TipoBlockTmp;
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
            value={TipoBlock.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={TipoBlock.activo} />
          <Checkbox
            id="experimental"
            name="experimental"
            label="Experimental"
            onChangeFN={handleChange}
            checked={TipoBlock.experimental}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoBlock;
