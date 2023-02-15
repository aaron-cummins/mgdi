import { useState, useContext, useMemo, useEffect } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { LugarTrabajoContext } from "../contexts/LugarTrabajoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormLugarTrabajo = () => {
  const { obtenerLugarTrabajo, lugartrabajoActual, actualizarLugarTrabajo, registrarLugarTrabajo } =
    useContext(LugarTrabajoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const {
    zonaList,
    tipoLugarTrabajoList,
    comunaList,
  } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const lugarTrabajoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      latitud: "",
      longitud: "",
      altura: "",
      direccion: "",
      telefono: "",
      zonaId: 0,
      zona: {
        id: 0,
      },
      comunaId: 0,
      comuna: {
        id: 0,
      },
      tipoLugarTrabajoId: 0,
      tipoLugarTrabajo: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [lugarTrabajo, setLugarTrabajo] = useState(lugarTrabajoDefault);

  useEffect(() => {
    lugartrabajoActual !== null ? setLugarTrabajo(lugartrabajoActual) : setLugarTrabajo(lugarTrabajoDefault);
  }, [lugartrabajoActual, lugarTrabajoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", lugarTrabajo.nombre, "nombre de lugar de trabajo requerido")) valida = false;
    if (validarTexto("abreviacion", lugarTrabajo.abreviacion, "Abreviación requerida")) valida = false;
    if (validarTexto("telefono", lugarTrabajo.telefono, "Teléfono requerido")) valida = false;
    if (validarNumero("longitud", lugarTrabajo.longitud, "Longitud requerida")) valida = false;
    if (validarNumero("latitud", lugarTrabajo.latitud, "Latitud requerida")) valida = false;
    if (validarNumero("altura", lugarTrabajo.altura, "Altura requerida")) valida = false;
    if (validarTexto("direccion", lugarTrabajo.direccion, "Dirección requerida")) valida = false;
    if (validarSelect("zonaId", lugarTrabajo.zona, "Debe seleccionar una zona")) valida = false;
    if (validarSelect("tipoLugarTrabajoId", lugarTrabajo.tipoLugarTrabajo, "Debe seleccionar un tipo de lugar de trabajo")) valida = false;
    if (validarSelect("comunaId", lugarTrabajo.comuna, "Debe seleccionar una comuna")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setLugarTrabajo({ ...lugarTrabajo, [name]: checked });
    else if (name === "zonaId") setLugarTrabajo({ ...lugarTrabajo, zona: { id: value } });
    else if (name === "tipoLugarTrabajoId") setLugarTrabajo({ ...lugarTrabajo, tipoLugarTrabajo: { id: value } });
    else if (name === "comunaId") setLugarTrabajo({ ...lugarTrabajo, comuna: { id: value } });
    else setLugarTrabajo({ ...lugarTrabajo, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setLugarTrabajo(lugarTrabajoDefault);
    obtenerLugarTrabajo(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      lugartrabajoActual !== null
        ? actualizarLugarTrabajo(lugarTrabajoAEnviar())
        : registrarLugarTrabajo(lugarTrabajoAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const lugarTrabajoAEnviar = () => {
    let lugarTrabajoTmp = { ...lugarTrabajo };
    lugarTrabajoTmp.comunaId = document.querySelector("#comunaId").value;
    lugarTrabajoTmp.zonaId = document.querySelector("#zonaId").value;
    lugarTrabajoTmp.tipoLugarTrabajoId = document.querySelector("#tipoLugarTrabajoId").value;
    return lugarTrabajoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-2">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={lugarTrabajo?.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-3">
          <InputText
            id="abreviacion"
            name="abreviacion"
            placeholder="Abreviación"
            label="Abreviación"
            value={lugarTrabajo?.abreviacion}
            onChangeFN={handleChange}
            required={true}
            error={error.abreviacion}
          />
        </div>
        <div className="form-group mb-3">
          <InputText
            id="telefono"
            name="telefono"
            placeholder="Telefono"
            label="Telefono"
            value={lugarTrabajo?.telefono}
            onChangeFN={handleChange}
            error={error.telefono}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            id="longitud"
            name="longitud"
            placeholder="Longitud"
            label="Longitud"
            value={lugarTrabajo?.longitud}
            onChangeFN={handleChange}
            error={error.longitud}
          />
        </div>
        <div className="form-group mb-2">
          <InputText
            id="latitud"
            name="latitud"
            placeholder="Latitud"
            label="Latitud"
            value={lugarTrabajo?.latitud}
            onChangeFN={handleChange}
            error={error.latitud}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            id="direccion"
            name="direccion"
            placeholder="Direccion"
            label="Direccion"
            value={lugarTrabajo?.direccion}
            onChangeFN={handleChange}
            error={error.direccion}
          />
        </div>
        <div className="form-group mb-2">
          <InputText
            id="altura"
            name="altura"
            placeholder="Altura"
            label="Altura"
            value={lugarTrabajo.altura}
            onChangeFN={handleChange}
            error={error.altura}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <Select
            id="zonaId"
            name="zonaId"
            placeholder="Zona"
            value={lugarTrabajo.zona?.id}
            onChange={handleChange}
            label="Zona"
            list={zonaList}
            required={true}
            error={error.zonaId}
          />
        </div>
        <div className="form-group mb-2">
          <Select
            id="tipoLugarTrabajoId"
            name="tipoLugarTrabajoId"
            placeholder="Tipo Lugar"
            value={lugarTrabajo.tipoLugarTrabajo?.id}
            onChange={handleChange}
            label="Tipo lugar trabajo"
            list={tipoLugarTrabajoList}
            required={true}
            error={error.tipoLugarTrabajoId}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <Select
            id="comunaId"
            name="comunaId"
            placeholder="Comuna"
            value={lugarTrabajo.comuna?.id}
            label="Comuna"
            list={comunaList}
            onChange={handleChange}
            error={error.comunaId}
          />
        </div>

        <div className="form-group mb-2">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={lugarTrabajo.activo} label="Activo" />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormLugarTrabajo;
