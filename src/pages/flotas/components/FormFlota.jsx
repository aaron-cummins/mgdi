import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { FlotaContext } from "../context/flotaContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormFlota = ({ closeModal }) => {
  const { registrarFlota, flotaActual, actualizarFlota, obtenerFlota } = useContext(FlotaContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const flotaDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );

  const [flota, setFlota] = useState(flotaDefault);

  useEffect(() => {
    flotaActual !== null ? setFlota(flotaActual) : setFlota(flotaDefault);
  }, [flotaActual, flotaDefault]);

  const validaciones = () => {
    let valida = true;
    if (validarTexto("nombre", flota.nombre, "Nombre requerido")) valida = false;
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setFlota({ ...flota, [name]: checked });
    else setFlota({ ...flota, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setFlota(flotaDefault);
    obtenerFlota(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      flotaActual !== null
        ? actualizarFlota(FlotaEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }))
        : registrarFlota(FlotaEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }));

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const FlotaEnviar = () => {
    let flotaTmp = { ...flota };
    return flotaTmp;
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
            value={flota.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={flota.activo} />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormFlota;
