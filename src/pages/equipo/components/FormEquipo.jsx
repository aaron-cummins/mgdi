import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { EquipoContext } from "../context/equipoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormEquipo = () => {
  const { registrarEquipo, equipoActual, actualizarEquipo, obtenerEquipo } = useContext(EquipoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const { aplicacionOemsList, oemsList } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const equipoDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      aplicacionOemId: 0,
      aplicacionOem: {
        id: 0,
      },
      oemId: 0,
      oem: {
        id: 0,
      },
      activo: false,
    }),
    []
  );

  const [equipo, setEquipo] = useState(equipoDefault);

  useEffect(() => {
    equipoActual !== null ? setEquipo(equipoActual) : setEquipo(equipoDefault);
  }, [equipoActual, equipoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", equipo.nombre, "Nombre requerido")) valida = false;
    if (validarSelect("aplicacionOemId", equipo.aplicacionOem, "Debe seleccionar una aplicación Oem")) valida = false;
    if (validarSelect("oemId", equipo.oem, "Debe seleccionar una Oem")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setEquipo({ ...equipo, [name]: checked });
    else if (name === "aplicacionOemId") setEquipo({ ...equipo, aplicacionOem: { id: value }, [name]: value });
    else if (name === "oemId") setEquipo({ ...equipo, oem: { id: value }, [name]: value });
    else setEquipo({ ...equipo, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setEquipo(equipoDefault);
    obtenerEquipo(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      equipoActual !== null ? actualizarEquipo(EquipoAEnviar()) : registrarEquipo(EquipoAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const EquipoAEnviar = () => {
    let equipoTmp = { ...equipo };
    equipoTmp.aplicacionOemId = document.querySelector("#aplicacionOemId").value;
    equipoTmp.oemId = document.querySelector("#oemId").value;
    return equipoTmp;
  };

  //console.log(equipo.aplicacionOem?.id)

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
            value={equipo.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="aplicacionOemId"
            name="aplicacionOemId"
            value={equipo.aplicacionOem?.id}
            onChange={handleChange}
            required={true}
            label="Aplicación Oem"
            list={aplicacionOemsList}
            error={error.aplicacionOemId}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-4">
          <Select
            id="oemId"
            name="oemId"
            value={equipo.oem?.id}
            onChange={handleChange}
            required={true}
            label="Oem"
            list={oemsList}
            error={error.oemId}
          />
        </div>
        <div className="form-group mb-2">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={equipo.activo} />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEquipo;
