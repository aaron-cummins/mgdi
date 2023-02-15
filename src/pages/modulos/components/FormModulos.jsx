import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { ModulosContext } from "../context/modulosContext";
import { closeModal, formatDate } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormModulos = () => {
  const { registrarModulos, modulosActual, actualizarModulos, obtenerModulos } = useContext(ModulosContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const modulosDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      controller: "",
      grupos: [],
      icono: "",
      created_at: formatDate(Date(Date.now)),
      updated_at: formatDate(Date(Date.now)),
      activo: false,
    }),
    []
  );

  const [modulos, setModulos] = useState(modulosDefault);

  useEffect(() => {
    modulosActual ? setModulos(modulosActual) : setModulos(modulosDefault);
  }, [modulosActual, modulosDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", modulos.nombre, "Nombre de modulos requerido")) valida = false;
    if (validarTexto("controller", modulos.controller, "Nombre controller requerido")) valida = false;
    if (validarTexto("icono", modulos.icono, "Nombre del icono requerido")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setModulos({ ...modulos, [name]: checked });
    else setModulos({ ...modulos, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setModulos(modulosDefault);
    obtenerModulos(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      modulosActual !== null
        ? actualizarModulos(ModulosAEnviar())
        : registrarModulos(ModulosAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const ModulosAEnviar = () => {
    let modulosTmp = { ...modulos };
    modulosTmp.grupos && delete modulosTmp.grupos;
    modulosTmp.grupos = [];
    modulosTmp.updated_at = formatDate(Date(Date.now));
    return modulosTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={modulos.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="controller"
            name="controller"
            placeholder="Controller"
            label="Controller"
            value={modulos.controller}
            onChangeFN={handleChange}
            required={true}
            error={error.controller}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="icono"
            name="icono"
            placeholder="<icono/>"
            label="Icono"
            value={modulos.icono}
            onChangeFN={handleChange}
            required={true}
            error={error.icono}
          />
        </div>
        <div className="form-group form-check mb-6 items-center">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={modulos.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormModulos;
