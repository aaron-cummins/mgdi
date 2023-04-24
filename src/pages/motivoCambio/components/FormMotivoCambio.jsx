import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { MotivoCambioContext } from "../context/MotivoCambioContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormMotivoCambio = ({ closeModal }) => {
  const { MotivoCambioActual, registrarMotivoCambio, actualizarMotivoCambio, obtenerMotivoCambio } =
    useContext(MotivoCambioContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const MotivoCambioDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [MotivoCambio, setMotivoCambio] = useState(MotivoCambioDefault);

  useEffect(() => {
    MotivoCambioActual ? setMotivoCambio(MotivoCambioActual) : setMotivoCambio(MotivoCambioDefault);
  }, [MotivoCambioActual, MotivoCambioDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", MotivoCambio.nombre, "Nombre motivo de cambio requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setMotivoCambio({ ...MotivoCambio, [name]: checked });
    else setMotivoCambio({ ...MotivoCambio, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setMotivoCambio(MotivoCambioDefault);
    obtenerMotivoCambio(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      MotivoCambioActual !== null
        ? actualizarMotivoCambio(MotivoCambioEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarMotivoCambio(MotivoCambioEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const MotivoCambioEnviar = () => {
    let MotivoCambioTmp = { ...MotivoCambio };
    return MotivoCambioTmp;
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
            value={MotivoCambio.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={MotivoCambio.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormMotivoCambio;
