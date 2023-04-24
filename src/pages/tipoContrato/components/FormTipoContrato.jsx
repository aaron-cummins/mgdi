import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoContratoContext } from "../context/TipoContratoContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipoContrato = ({ closeModal }) => {
  const { TipoContratoActual, registrarTipoContrato, actualizarTipoContrato, obtenerTipoContrato } =
    useContext(TipoContratoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const TipoContratoDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [TipoContrato, setTipoContrato] = useState(TipoContratoDefault);

  useEffect(() => {
    TipoContratoActual ? setTipoContrato(TipoContratoActual) : setTipoContrato(TipoContratoDefault);
  }, [TipoContratoActual, TipoContratoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", TipoContrato.nombre, "Nombre de tipo de contrato requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipoContrato({ ...TipoContrato, [name]: checked });
    else setTipoContrato({ ...TipoContrato, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipoContrato(TipoContratoDefault);
    obtenerTipoContrato(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      TipoContratoActual !== null
        ? actualizarTipoContrato(TipoContratoEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarTipoContrato(TipoContratoEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipoContratoEnviar = () => {
    let TipoContratoTmp = { ...TipoContrato };
    return TipoContratoTmp;
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
            value={TipoContrato.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={TipoContrato.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoContrato;
