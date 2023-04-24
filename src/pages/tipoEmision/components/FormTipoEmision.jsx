import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoEmisionContext } from "../context/tipoemisionContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipoEmision = ({ closeModal }) => {
  const { registrarTipoEmision, tipoemisionActual, actualizarTipoEmision, obtenerTipoEmision } =
    useContext(TipoEmisionContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const tipoemisionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipoemision, setTipoEmision] = useState(tipoemisionDefault);

  useEffect(() => {
    tipoemisionActual ? setTipoEmision(tipoemisionActual) : setTipoEmision(tipoemisionDefault);
  }, [tipoemisionActual, tipoemisionDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", tipoemision.nombre, "Nombre de tipo emisión requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipoEmision({ ...tipoemision, [name]: checked });
    else setTipoEmision({ ...tipoemision, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipoEmision(tipoemisionDefault);
    obtenerTipoEmision(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      tipoemisionActual !== null
        ? actualizarTipoEmision(TipoEmisionAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarTipoEmision(TipoEmisionAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipoEmisionAEnviar = () => {
    let tipoemisionTmp = { ...tipoemision };
    return tipoemisionTmp;
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
            value={tipoemision.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={tipoemision.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoEmision;
