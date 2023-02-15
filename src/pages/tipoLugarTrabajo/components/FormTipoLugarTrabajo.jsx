import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipolugartrabajoContext } from "../context/tipolugartrabajoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipolugartrabajo = () => {
  const { registrarTipolugartrabajo, tipolugartrabajoActual, actualizarTipolugartrabajo, obtenerTipolugartrabajo } =
    useContext(TipolugartrabajoContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const tipolugartrabajoDefault = useMemo(() => {
    return {
      id: 0,
      tipo: "",
      activo: false,
    };
  }, []);

  const [tipolugartrabajo, setTipolugartrabajo] = useState(tipolugartrabajoDefault);

  useEffect(() => {
    tipolugartrabajoActual ? setTipolugartrabajo(tipolugartrabajoActual) : setTipolugartrabajo(tipolugartrabajoDefault);
  }, [tipolugartrabajoActual, tipolugartrabajoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", tipolugartrabajo.tipo, "Nombre de tipo lugar trabajo requerido")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipolugartrabajo({ ...tipolugartrabajo, [name]: checked });
    else setTipolugartrabajo({ ...tipolugartrabajo, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipolugartrabajo(tipolugartrabajoDefault);
    obtenerTipolugartrabajo(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      tipolugartrabajoActual !== null
        ? actualizarTipolugartrabajo(TipolugartrabajoAEnviar())
        : registrarTipolugartrabajo(TipolugartrabajoAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipolugartrabajoAEnviar = () => {
    let tipolugartrabajoTmp = { ...tipolugartrabajo };
    return tipolugartrabajoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="tipo"
            name="tipo"
            placeholder="Tipo"
            label="Tipo"
            value={tipolugartrabajo.tipo}
            onChangeFN={handleChange}
            required={true}
            error={error.tipo}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox
            id="activo"
            name="activo"
            label="Activo"
            onChangeFN={handleChange}
            checked={tipolugartrabajo.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipolugartrabajo;
