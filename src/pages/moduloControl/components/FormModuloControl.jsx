import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { ModuloControlContext } from "../context/moduloControlContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormModuloControl = ({ closeModal }) => {
  const { registrarModuloControl, modulocontrolActual, actualizarModuloControl, obtenerModuloControl } =
    useContext(ModuloControlContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const modulocontrolDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      activo: false,
    };
  }, []);

  const [modulocontrol, setModuloControl] = useState(modulocontrolDefault);

  useEffect(() => {
    modulocontrolActual !== null ? setModuloControl(modulocontrolActual) : setModuloControl(modulocontrolDefault);
  }, [modulocontrolActual, modulocontrolDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", modulocontrol.nombre, "Nombre del modulo de control requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setModuloControl({ ...modulocontrol, [name]: checked });
    else setModuloControl({ ...modulocontrol, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setModuloControl(modulocontrolDefault);
    obtenerModuloControl(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      modulocontrolActual !== null
        ? actualizarModuloControl(ModuloControlEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarModuloControl(ModuloControlEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const ModuloControlEnviar = () => {
    let modulocontrolTmp = { ...modulocontrol };
    return modulocontrolTmp;
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
            value={modulocontrol.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={modulocontrol.activo} />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormModuloControl;
