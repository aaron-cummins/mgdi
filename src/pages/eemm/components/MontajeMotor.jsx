import React, { useContext, useEffect, useState } from "react";
import { Alerts, Filtros, Header, Seccion, Select } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import { TbEngine } from "react-icons/tb";
import { GiMineTruck } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { EemmContext } from "../context/eemmContext";

import FormMontaje from "./montaje/FormMontaje";
import TablaUnidad from "./tablas/TablaUnidad";
import TablaEsn from "./tablas/TablaEsn";
import useValidacionForm from "hooks/useValidacionForm";
import { useSnackbar } from "notistack";

const MontajeMotor = () => {
  const { eemm, setEemm, obtenerEemmEsnlist, obtenerEemmUnidadlist, eemmDefault, unidadMontada, esnMontado } =
    useContext(EemmContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();
  const { enqueueSnackbar } = useSnackbar();
  const {
    obtenerAm,
    obtenerFlotasLugarTrabajo,
    obtenerUnidades,
    obtenerEsn,
    limpiarFlotasLugarTrabajo,
    limpiarUnidades,
    limpiarEsn,
    obtenerEstadoEquipo,
    obtenerEstadoMotor,
    obtenerEstadoEquipoInstalaciones,
    obtenerEstadoMotorInstalaciones,
    obtenerTipoContrato,
    lugarTrabajoUsuarioList,
    flotasLugarTrabajoList,
    unidadesList,
    esnList,
  } = useContext(SelectsContext);

  useEffect(() => {
    setEemm(eemmDefault);
    obtenerAm();
    obtenerEstadoEquipo();
    obtenerEstadoMotor(true);
    obtenerEstadoEquipoInstalaciones();
    obtenerEstadoMotorInstalaciones();
    obtenerTipoContrato();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const validaciones = () => {
    let valida = true;

    if (validarNumero("lugarTrabajoId", eemm.lugarTrabajoId, "Debe seleccionar un lugar de trabajo")) valida = false;
    if (validarSelect("flotaLugarTrabajoId", eemm.flotaLugarTrabajo, "Debe seleccionar una flota")) valida = false;
    if (validarSelect("unidadId", eemm.unidad, "Debe seleccionar una unidad")) valida = false;
    if (validarSelect("esnId", eemm.esn, "Debe seleccionar un ESN")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    //console.log(name, value, type);

    if (name === "lugarTrabajoId") {
      obtenerFlotasLugarTrabajo(value);
      setEemm({ ...eemm, lugarTrabajo: { id: value }, [name]: value });
      limpiarFlotasLugarTrabajo();
      limpiarUnidades();
      limpiarEsn();
      setVisible(false);
    } else if (name === "flotaLugarTrabajoId") {
      obtenerUnidades(value);
      setEemm({ ...eemm, flotaLugarTrabajo: { id: value }, [name]: value });
      limpiarUnidades();
      limpiarEsn();
      setVisible(false);
    } else if (name === "unidadId") {
      obtenerEsn(false);
      setEemm({ ...eemm, unidad: { id: value }, [name]: value });
      setVisible(false);
    } else if (name === "esnId") {
      setEemm({ ...eemm, esn: { id: value }, [name]: value });
      setVisible(false);
    } else setEemm({ ...eemm, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const handleSearch = (e) => {
    if (validaciones()) {
      obtenerEemmEsnlist(eemm.esn.id);
      obtenerEemmUnidadlist(eemm.unidad.id);

      setVisible(true);
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const volver = () => {
    //setEemm(eemmDefault);
    //obtenerEemmEsnlist(null);
    //obtenerEemmUnidadlist(null);
    navigate("/eemm");
    setError([]);
  };

  return (
    <>
      <Header category="Administración" title="Montaje Motor">
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

      <Filtros Fn={handleSearch}>
        <div className="form-group">
          <Select
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            label="Lugar Trabajo"
            list={lugarTrabajoUsuarioList}
            value={eemm?.lugarTrabajo?.id}
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
            required={true}
            error={error.unidadId}
          />
        </div>

        <div className="form-group">
          <Select
            id="esnId"
            name="esnId"
            placeholder="ESN"
            label="ESN"
            list={esnList}
            value={eemm?.esn?.id}
            onChange={(e) => handleChange(e)}
            required={true}
            error={error.esnId}
          />
        </div>
      </Filtros>

      <Seccion titulo="Historial de la unidad" icono={<GiMineTruck />} visible={visible}>
        <TablaUnidad />
      </Seccion>

      <Seccion titulo="Historial ESN" icono={<TbEngine />} visible={visible}>
        <TablaEsn />
      </Seccion>

      <Seccion titulo="Informacion de montaje" visible={visible}>
        {unidadMontada ? (
          <Alerts type="danger">
            La unidad ya tiene un motor instalado, para montar el nuevo motor debe desmontar el actual.
          </Alerts>
        ) : esnMontado ? (
          <Alerts type="danger">El ESN ya se encuentra montado en otro equipo.</Alerts>
        ) : (
          <FormMontaje />
        )}
      </Seccion>
    </>
  );
};

export default MontajeMotor;
