import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { VersionEquipoContext } from "../context/versionEquipoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormVersionEquipo = () => {
  const { registrarVersionEquipo, versionequipoActual, actualizarVersionEquipo, obtenerVersionEquipo } =
    useContext(VersionEquipoContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const versionequipoDefault = useMemo(() => {
    return {
      id: 0,
      version: "",
      activo: false,
    };
  }, []);

  const [versionequipo, setVersionEquipo] = useState(versionequipoDefault);

  useEffect(() => {
    versionequipoActual !== null ? setVersionEquipo(versionequipoActual) : setVersionEquipo(versionequipoDefault);
  }, [versionequipoActual, versionequipoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("version", versionequipo.version, "Versión requerida")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setVersionEquipo({ ...versionequipo, [name]: checked });
    else setVersionEquipo({ ...versionequipo, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setVersionEquipo(versionequipoDefault);
    obtenerVersionEquipo(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      versionequipoActual !== null
        ? actualizarVersionEquipo(VersionEquipoEnviar())
        : registrarVersionEquipo(VersionEquipoEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const VersionEquipoEnviar = () => {
    let versionequipoTmp = { ...versionequipo };
    return versionequipoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="version"
            name="version"
            placeholder="Versión"
            label="Versión"
            value={versionequipo.version}
            onChangeFN={handleChange}
            required={true}
            error={error.version}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={versionequipo.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormVersionEquipo;
