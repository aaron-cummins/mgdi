import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipolugartrabajoContext } from "../context/tipolugartrabajoContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipolugartrabajo = ({ closeModal }) => {
  const { registrarTipolugartrabajo, tipolugartrabajoActual, actualizarTipolugartrabajo, obtenerTipolugartrabajo } =
    useContext(TipolugartrabajoContext);
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
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      tipolugartrabajoActual !== null
        ? actualizarTipolugartrabajo(TipolugartrabajoAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarTipolugartrabajo(TipolugartrabajoAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
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
        <div className="form-group">
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
