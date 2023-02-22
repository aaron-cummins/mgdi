import React, { useEffect, useMemo, useState } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { UnidadContext } from "../context/unidadContext";
import { closeModal, formatDateshort } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormUnidad = () => {
  const { registrarUnidad, unidadActual, actualizarUnidad, obtenerUnidad } = useContext(UnidadContext);
  const { mensaje } = useStateContext();
  const {
    obtenerFlotasLugarTrabajo,
    aplicacionOemsList,
    lugarTrabajoUsuarioList,
    oemsList,
    versionEquiposList,
    flotasLugarTrabajoList,
  } = useContext(SelectsContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const unidadDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      lugarTrabajoId: 0,
      lugarTrabajo: {
        id: 0,
      },
      flotaLugarTrabajoId: 0,
      flotaLugarTrabajo: {
        id: 0,
      },
      oemId: 0,
      oem: {
        id: 0,
      },
      aplicacionOemId: 0,
      aplicacionOem: {
        id: 0,
      },
      nserieEquipo: "",
      modelo: "",
      versionId: 0,
      version: {
        id: 0,
      },
      conversionUnidadId: 0,
      fechaActivacion: "",
      fechaDesactivacion: "",
      usuarioId: 0,
      activo: false,
    };
  }, []);

  const [unidad, setUnidad] = useState(unidadDefault);
  //const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (unidadActual !== null) {
      unidadActual.lugarTrabajo = unidadActual.flotaLugarTrabajo.lugarTrabajo;
      unidadActual.fechaActivacion = unidadActual.fechaActivacion ? formatDateshort(unidadActual.fechaActivacion) : "";
      unidadActual.fechaDesactivacion = unidadActual.fechaDesactivacion
        ? formatDateshort(unidadActual.fechaDesactivacion)
        : "";
      setUnidad(unidadActual);
      obtenerFlotasLugarTrabajo(unidadActual.flotaLugarTrabajo.lugarTrabajo?.id);
    } else setUnidad(unidadDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unidadActual, unidadDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", unidad.nombre, "Nombre unidad requerido")) valida = false;
    if (validarTexto("nserieEquipo", unidad.nserieEquipo, "Serie de equipo requerido")) valida = false;
    if (validarTexto("modelo", unidad.modelo, "Modelo requerido")) valida = false;
    if (validarSelect("lugarTrabajoId", unidad.lugarTrabajo, "Debe seleccionar un lugar de trabajo")) valida = false;
    if (validarSelect("flotaLugarTrabajoId", unidad.flotaLugarTrabajo, "Debe seleccionar una flota lugar trabajo"))
      valida = false;
    if (validarSelect("aplicacionOemId", unidad.aplicacionOem, "Debe seleccionar una aplicacion Oem")) valida = false;
    if (validarSelect("oemId", unidad.oem, "Debe seleccionar un oem")) valida = false;
    if (validarSelect("versionId", unidad.version, "Debe seleccionar una versión de equipo")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    //console.log(e);

    if (type === "checkbox") setUnidad({ ...unidad, [name]: checked });
    else if (name === "lugarTrabajoId") {
      setUnidad({ ...unidad, [name]: value, lugarTrabajo: { id: value } });
      obtenerFlotasLugarTrabajo(value);
    } else if (name === "flotaLugarTrabajoId")
      setUnidad({ ...unidad, [name]: value, flotaLugarTrabajo: { id: value } });
    else if (name === "aplicacionOemId") {
      setUnidad({ ...unidad, aplicacionOem: { id: value }, [name]: value });
    } else if (name === "oemId") setUnidad({ ...unidad, oem: { id: value }, [name]: value });
    else if (name === "versionId") setUnidad({ ...unidad, version: { id: value }, [name]: value });
    else setUnidad({ ...unidad, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setUnidad(unidadDefault);
    obtenerUnidad(null);
    closeModal();
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      unidadActual !== null ? actualizarUnidad(UnidadAEnviar()) : registrarUnidad(UnidadAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const UnidadAEnviar = () => {
    let unidadTmp = { ...unidad };

    unidadTmp.flotaLugarTrabajoId = unidad.flotaLugarTrabajo.id;
    unidadTmp.oemId = unidad.oem.id;
    unidadTmp.aplicacionOemId = unidad.aplicacionOem.id;
    unidadTmp.versionId = unidad.version.id;
    unidadTmp.usuarioId = 1;
    return unidadTmp;
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-2">
            <Select
              id="lugarTrabajoId"
              name="lugarTrabajoId"
              placeholder="Lugar Trabajo"
              label="Lugar trabajo"
              list={lugarTrabajoUsuarioList}
              value={unidad.lugarTrabajo?.id}
              onChange={handleChange}
              required={true}
              error={error.lugarTrabajoId}
            />
          </div>
          <div className="form-group mb-2">
            <Select
              id="flotaLugarTrabajoId"
              name="flotaLugarTrabajoId"
              placeholder="Flota"
              label="Flota"
              list={flotasLugarTrabajoList}
              value={unidad.flotaLugarTrabajo?.id}
              onChange={handleChange}
              required={true}
              error={error.flotaLugarTrabajoId}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-4">
            <InputText
              id="nombre"
              name="nombre"
              label="Nombre unidad"
              placeholder="Nombre"
              value={unidad.nombre}
              onChangeFN={handleChange}
              required={true}
              error={error.nombre}
            />
          </div>
          <div className="form-group mb-4">
            <InputText
              id="nserieEquipo"
              name="nserieEquipo"
              placeholder="A012345"
              label="Número de serie"
              value={unidad.nserieEquipo}
              onChangeFN={handleChange}
              required={true}
              error={error.nserieEquipo}
            />
          </div>
          <div className="form-group mb-4">
            <InputText
              id="modelo"
              name="modelo"
              placeholder="930-E4"
              label="Modelo"
              value={unidad.modelo}
              onChangeFN={handleChange}
              required={true}
              error={error.modelo}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-4">
            <Select
              id="aplicacionOemId"
              name="aplicacionOemId"
              label="Aplicación OEM"
              list={aplicacionOemsList}
              value={unidad.aplicacionOem?.id}
              onChange={handleChange}
              required={true}
              error={error.aplicacionOemId}
            />
          </div>
          <div className="form-group mb-4">
            <Select
              id="oemId"
              name="oemId"
              label="OEM"
              list={oemsList}
              value={unidad.oem?.id}
              onChange={handleChange}
              required={true}
              error={error.oemId}
            />
          </div>
          <div className="form-group mb-4">
            <Select
              id="versionId"
              name="versionId"
              placeholder="Versión Equipo"
              label="Versión Equipo"
              list={versionEquiposList}
              value={unidad.version.id}
              onChange={handleChange}
              required={true}
              error={error.versionId}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-4">
            <InputText
              type="date"
              id="fechaActivacion"
              name="fechaActivacion"
              placeholder="Fecha Activación"
              label="Fecha Activación"
              value={unidad.fechaActivacion}
              onChangeFN={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-4">
            <InputText
              type="date"
              id="fechaDesactivacion"
              name="fechaDesactivacion"
              placeholder="Fecha Desactivación"
              label="Fecha Desactivación"
              value={unidad.fechaDesactivacion}
              onChangeFN={handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={unidad.activo} />
          </div>
        </div>
        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <Buttons cancelFN={() => limpiaForm()} />
        </div>
      </form>
    </>
  );
};

export default FormUnidad;
