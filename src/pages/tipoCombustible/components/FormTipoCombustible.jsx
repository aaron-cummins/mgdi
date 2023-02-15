import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoCombustibleContext } from "../context/tipocombustibleContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipoCombustible = () => {
  const { registrarTipoCombustible, tipocombustibleActual, actualizarTipoCombustible, obtenerTipoCombustible } =
    useContext(TipoCombustibleContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const tipocombustibleDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipocombustible, setTipoCombustible] = useState(tipocombustibleDefault);

  useEffect(() => {
    tipocombustibleActual ? setTipoCombustible(tipocombustibleActual) : setTipoCombustible(tipocombustibleDefault);
  }, [tipocombustibleActual, tipocombustibleDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", tipocombustible.nombre, "Nombre del tipo combustible requerido")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipoCombustible({ ...tipocombustible, [name]: checked });
    else setTipoCombustible({ ...tipocombustible, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipoCombustible(tipocombustibleDefault);
    obtenerTipoCombustible(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      tipocombustibleActual !== null
        ? actualizarTipoCombustible(TipoCombustibleEnviar())
        : registrarTipoCombustible(TipoCombustibleEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipoCombustibleEnviar = () => {
    let tipocombustibleTmp = { ...tipocombustible };
    return tipocombustibleTmp;
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
            value={tipocombustible.nombre}
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
            checked={tipocombustible.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoCombustible;
