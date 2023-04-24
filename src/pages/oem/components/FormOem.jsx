import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { OemContext } from "../context/oemContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormOem = ({ closeModal }) => {
  const { registrarOem, oemActual, actualizarOem, obtenerOem } = useContext(OemContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const oemDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      activo: false,
    };
  }, []);

  const [oem, setOem] = useState(oemDefault);

  useEffect(() => {
    oemActual ? setOem(oemActual) : setOem(oemDefault);
  }, [oemActual, oemDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", oem.nombre, "Nombre Oem requerido")) valida = false;
    if (validarTexto("abreviacion", oem.abreviacion, "Nombre abreviación requerida")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setOem({ ...oem, [name]: checked });
    else setOem({ ...oem, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setOem(oemDefault);
    obtenerOem(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      oemActual !== null
        ? actualizarOem(OemAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }))
        : registrarOem(OemAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }));

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const OemAEnviar = () => {
    let oemTmp = { ...oem };
    return oemTmp;
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
            value={oem.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <InputText
            id="abreviacion"
            name="abreviacion"
            placeholder="Abreviacion"
            label="Abreviacion"
            value={oem.abreviacion}
            onChangeFN={handleChange}
            required={true}
            error={error.abreviacion}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={oem.activo} />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormOem;
