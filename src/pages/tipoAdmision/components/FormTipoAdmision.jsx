import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoAdmisionContext } from "../context/tipoadmisionContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormTipoAdmision = ({ closeModal }) => {
  const { registrarTipoAdmision, tipoadmisionActual, actualizarTipoAdmision, obtenerTipoAdmision } =
    useContext(TipoAdmisionContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const tipoadmisionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipoadmision, setTipoAdmision] = useState(tipoadmisionDefault);

  useEffect(() => {
    tipoadmisionActual ? setTipoAdmision(tipoadmisionActual) : setTipoAdmision(tipoadmisionDefault);
  }, [tipoadmisionActual, tipoadmisionDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", tipoadmision.nombre, "Nombre tipo admisión requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setTipoAdmision({ ...tipoadmision, [name]: checked });
    else setTipoAdmision({ ...tipoadmision, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setTipoAdmision(tipoadmisionDefault);
    obtenerTipoAdmision(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      tipoadmisionActual !== null
        ? actualizarTipoAdmision(TipoAdmisionAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          )
        : registrarTipoAdmision(TipoAdmisionAEnviar()).then((res) =>
            enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta })
          );

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const TipoAdmisionAEnviar = () => {
    let tipoadmisionTmp = { ...tipoadmision };
    return tipoadmisionTmp;
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
            value={tipoadmision.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={tipoadmision.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoAdmision;
