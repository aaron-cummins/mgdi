import React, { useContext, useEffect, useState } from "react";
import { Alerts, Filtros, Header, Seccion, Select } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import { GiMineTruck } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { EemmContext } from "../context/eemmContext";

import FormDesmontaje from "./desmontaje/FormDesmontaje";
import TablaUnidad from "./tablas/TablaUnidad";
import useValidacionForm from "hooks/useValidacionForm";
import { useSnackbar } from "notistack";

const DesmontajeMotor = () => {
  const { eemm, setEemm, obtenerEemmUnidadlist, eemmDefault, unidadMontada } = useContext(EemmContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();
  const { enqueueSnackbar } = useSnackbar();
  const {
    obtenerAd,
    obtenerFlotasLugarTrabajo,
    obtenerUnidades,
    limpiarFlotasLugarTrabajo,
    limpiarUnidades,
    obtenerEstadoEquipo,
    obtenerEstadoMotor,
    obtenerTipoContrato,
    obtenerMotivoCambio,
    obtenerTipoSalida,
    lugarTrabajoUsuarioList,
    flotasLugarTrabajoList,
    unidadesList,
    obtenerUb,
    obtenerEsn,
  } = useContext(SelectsContext);

  useEffect(() => {
    setEemm(eemmDefault);
    obtenerAd();
    obtenerEstadoEquipo();
    obtenerEstadoMotor(false);
    obtenerTipoContrato();
    obtenerMotivoCambio();
    obtenerTipoSalida();
    obtenerUb();
    obtenerEsn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const validaciones = () => {
    let valida = true;

    if (validarNumero("lugarTrabajoId", eemm.lugarTrabajoId, "Debe seleccionar un lugar de trabajo")) valida = false;
    if (validarSelect("flotaLugarTrabajoId", eemm.flotaLugarTrabajo, "Debe seleccionar una flota")) valida = false;
    if (validarSelect("unidadId", eemm.unidad, "Debe seleccionar una unidad")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "lugarTrabajoId") {
      obtenerFlotasLugarTrabajo(value);
      setEemm({ ...eemm, lugarTrabajo: { id: value }, flotaLugarTrabajo: { id: 0 }, unidad: { id: 0 }, [name]: value });
      limpiarFlotasLugarTrabajo();
      limpiarUnidades();
      setVisible(false);
    } else if (name === "flotaLugarTrabajoId") {
      obtenerUnidades(value);
      setEemm({ ...eemm, flotaLugarTrabajo: { id: value }, unidad: { id: 0 }, [name]: value });
      limpiarUnidades();
      setVisible(false);
    } else if (name === "unidadId") {
      setEemm({ ...eemm, unidad: { id: value }, [name]: value });
      setVisible(false);
    } else setEemm({ ...eemm, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const handleSearch = (e) => {
    if (validaciones()) {
      obtenerEemmUnidadlist(eemm.unidad.id);
      setVisible(true);
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const volver = () => {
    //setEemm(eemmDefault);
    //setEemm(eemmDefault);
    //console.log(eemmDefault);
    //obtenerEemmUnidadlist(null);
    navigate("/eemm");
    setError([]);
  };

  return (
    <>
      <Header category="Administración" title="Desmontaje Motor">
        <button
          type="button"
          style={{
            color: "white",
            borderRadius: "10px",
          }}
          className={`gap-5 p-3 hover:drop-shadow-xl bg-light-gray hover:bg-light-gray text-center inline-flex items-center`}
          onClick={volver}>
          Volver
        </button>
      </Header>

      <Filtros Fn={handleSearch} columnas="3">
        <div className="form-group">
          <Select
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            label="Lugar Trabajo"
            list={lugarTrabajoUsuarioList}
            value={eemm?.lugarTrabajo?.id}
            onChange={handleChange}
            required={true}
            error={error.lugarTrabajoId}
          />
        </div>
        <div className="form-group">
          <Select
            id="flotaLugarTrabajoId"
            name="flotaLugarTrabajoId"
            placeholder="Flota"
            label="Flota"
            list={flotasLugarTrabajoList}
            value={eemm?.flotaLugarTrabajo?.id}
            onChange={handleChange}
            required={true}
            error={error.flotaLugarTrabajoId}
          />
        </div>
        <div className="form-group">
          <Select
            id="unidadId"
            name="unidadId"
            placeholder="Unidad"
            label="Unidad"
            list={unidadesList}
            value={eemm?.unidad?.id}
            onChange={handleChange}
            required={true}
            error={error.unidadId}
          />
        </div>
      </Filtros>

      <Seccion titulo="Historial de la unidad" icono={<GiMineTruck />} visible={visible}>
        <TablaUnidad />
      </Seccion>

      <Seccion titulo="Información de Desmontaje" visible={visible}>
        {unidadMontada ? <FormDesmontaje /> : <Alerts type="danger">La unidad ya de encuentra desmontada.</Alerts>}
      </Seccion>
    </>
  );
};

export default DesmontajeMotor;
