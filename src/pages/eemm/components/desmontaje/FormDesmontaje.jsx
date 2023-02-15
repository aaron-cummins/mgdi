import { EemmContext } from "../../context/eemmContext";
import React, { useContext, useEffect } from "react";
import { formatDateshort } from "utilities/Utiles";
import { Buttons, InputText, Select } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormDesmontaje = (props) => {
  const {
    obtenerEemm,
    registrarEemm,
    actualizarEemm,
    eemmActual,
    eemm,
    setEemm,
    eemmDefault,
    eemmUnidad,
    obtenerEemmUnidadlist,
    actualizarEsn,
  } = useContext(EemmContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const {
    adList,
    estadoEquipoList,
    estadoMotorList,
    tipoContratoList,
    motivoCambioList,
    tipoSalidaList,
    ubList,
    esnList,
  } = useContext(SelectsContext);

  useEffect(() => {
    //eemmActual !== null ? setEemm(eemmActual) : setEemm(eemm);}
    eemm ? setEemm(eemm) : setEemm(eemmDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eemmActual, eemm]);

  useEffect(() => {
    if (eemmUnidad.length > 0) {
      let em = eemmUnidad[eemmUnidad.length - 1];
      let eemmAct = em;
      let HHequipo = 0;
      let HHmotor = 0;

      eemmUnidad.forEach((item) => {
        HHequipo += item.hrEquipoInstalacion;
        HHmotor += item.hrOperadaMotor;
      });

      eemmAct.lugarTrabajoId = em.flotaLugarTrabajo.lugarTrabajo.id;
      eemmAct.flotaLugarTrabajoId = em.flotaLugarTrabajo.id;
      eemmAct.unidadId = em.unidad.id;

      eemmAct.amId = em.avisoMontaje?.id;
      eemmAct.aprobadorDesmontajeId = em.aprobadorDesmontaje ? em.aprobadorDesmontaje?.id : 0;
      eemmAct.aprobadorId = em.aprobador ? em.aprobador?.id : 0;
      eemmAct.aprobadorMontajeId = em.aprobadorMontaje ? em.aprobadorMontaje?.id : 0;
      eemmAct.usuarioId = em.usuario ? em.usuario?.id : 0;
      eemmAct.intervencionId = em.intervencion ? em.intervencion?.id : 0;
      eemmAct.ubId = em.ub?.id;
      eemmAct.contratoId = em.contrato?.id;
      eemmAct.estadoEquipoInstalacionId = em.estadoEquipoInstalacion?.id;
      eemmAct.estadoMotorInstalacionId = em.estadoMotorInstalacion?.id;
      eemmAct.estadoEquipoId = em.estadoEquipo?.id;
      eemmAct.estadoMotorId = em.estadoMotor?.id;
      eemmAct.esnId = em.esn?.id;
      eemmAct.usuarioId = em.usuario?.id;
      eemmAct.hrMotorInstalacion = em.hrMotorInstalacion ? em.hrMotorInstalacion : 0;
      eemmAct.hrAcumuladasMotor = em.hrAcumuladasMotor ? em.hrAcumuladasMotor : 0;
      eemmAct.hrEquipoInstalacion = em.hrEquipoInstalacion ? em.hrEquipoInstalacion : 0;
      eemmAct.hrHistoricoEquipo = HHequipo ? HHequipo : 0;
      eemmAct.hrHistoricoMotor = HHmotor ? HHmotor : 0;
      eemmAct.hrOperadaMotor = em.hrOperadaMotor ? em.hrOperadaMotor : 0;
      eemmAct.tsr = em.tsr ? em.tsr : "";

      setEemm(eemmAct);

      //setEemm(...eemm, em);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eemmUnidad]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("fechaFalla", eemm.fechaFalla, "Debe seleccionar una fecha de detención o falla")) valida = false;
    if (validarTexto("tsr", eemm.tsr, "Debe ingresar un numero de TSR")) valida = false;
    if (validarSelect("estadoEquipoId", eemm.estadoEquipo, "Debe seleccionar un estado")) valida = false;
    if (validarSelect("estadoMotorId", eemm.estadoMotor, "Debe seleccionar un estado")) valida = false;
    if (validarSelect("contratoId", eemm.contrato, "Debe seleccionar un contrato")) valida = false;
    if (validarSelect("motivoCambioId", eemm.motivoCambio, "Debe seleccionar un motivo de cambio")) valida = false;
    if (validarSelect("tipoSalidaId", eemm.tipoSalida, "Debe seleccionar un tipo de salida")) valida = false;
    if (validarSelect("adId", eemm.ad, "Debe seleccionar un aviso de desmontaje")) valida = false;
    if (validarSelect("ubId", eemm.ub, "Debe seleccionar una Ub")) valida = false;
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") setEemm({ ...eemm, [name]: checked });
    else if (name === "estadoEquipoId") setEemm({ ...eemm, estadoEquipo: { id: value }, [name]: value });
    else if (name === "estadoMotorId") setEemm({ ...eemm, estadoMotor: { id: value }, [name]: value });
    else if (name === "motivoCambioId") setEemm({ ...eemm, motivoCambio: { id: value }, [name]: value });
    else if (name === "tipoSalidaId") setEemm({ ...eemm, tipoSalida: { id: value }, [name]: value });
    else if (name === "adId") setEemm({ ...eemm, ad: { id: value }, [name]: value });
    else if (name === "ubId") setEemm({ ...eemm, ub: { id: value }, [name]: value });
    else setEemm({ ...eemm, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setEemm(eemmDefault);
    obtenerEemm(null);
    setError([]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    DesmontajeAEnviar();
    if (validaciones()) {
      //eemmActual !== null ? actualizarEemm(DesmontajeAEnviar(), false) : registrarEemm(DesmontajeAEnviar(), false);

      eemm.id !== 0 ? actualizarEemm(DesmontajeAEnviar(), false) : registrarEemm(DesmontajeAEnviar(), false);

      actualizarEsn(eemm.esn.id, false).then((item) => {
        obtenerEemmUnidadlist(eemm.unidad.id);
      });

      //fuerzaFiltros();

      /*limpiaForm();*/
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const DesmontajeAEnviar = () => {
    let desmontajeTmp = { ...eemm };

    desmontajeTmp.estadoEquipoId = eemm.estadoEquipo.id;
    desmontajeTmp.estadoMotorId = eemm.estadoMotor.id;
    desmontajeTmp.motivoCambioId = eemm.motivoCambio.id;
    desmontajeTmp.tipoSalidaId = eemm.tipoSalida.id;
    desmontajeTmp.adId = eemm.ad.id;
    desmontajeTmp.ubId = eemm.ub.id;
    desmontajeTmp.activo = false;

    return desmontajeTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <Select
            id="esnId"
            name="esnId"
            placeholder="ESN [Placa]"
            label="ESN [Placa]"
            list={esnList}
            value={eemm?.esn?.id}
            onChange={handleChange}
            required={true}
            readOnly={true}
            error={error?.esnId}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            type="date"
            id="fechaps"
            name="fechaps"
            placeholder="Fecha PS"
            label="Fecha puesta en servicio"
            value={eemm?.fechaps ? formatDateshort(eemm?.fechaps) : ""}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error?.fechaps}
          />
        </div>

        <div className="form-group mb-4">
          <InputText
            type="date"
            id="fechaFalla"
            name="fechaFalla"
            placeholder="Fecha falla o detención"
            label="Fecha falla o detención"
            value={eemm?.fechaFalla}
            onChangeFN={handleChange}
            required={true}
            error={error?.fechaFalla}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="hrOperadaMotor"
            name="hrOperadaMotor"
            placeholder="Hrs Operadas Motor"
            label="Horas operadas Motor"
            value={eemm?.hrOperadaMotor}
            onChangeFN={handleChange}
            required={true}
            error={error?.hrOperadaMotor}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <InputText
            id="hrMotorInstalacion"
            name="hrMotorInstalacion"
            placeholder="Hrs Motor en instalación"
            label="Horas Motor en instalación"
            value={eemm?.hrMotorInstalacion}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error?.hrMotorInstalacion}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="hrAcumuladasMotor"
            name="hrAcumuladasMotor"
            placeholder="Hrs acumuladas motor"
            label="Horas acumuladas motor"
            value={eemm?.hrAcumuladasMotor}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error?.hrAcumuladasMotor}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="estadoEquipoId"
            name="estadoEquipoId"
            placeholder="Estado Equipo"
            label="Estado Equipo"
            list={estadoEquipoList}
            value={eemm?.estadoEquipo?.id}
            onChange={handleChange}
            required={true}
            error={error?.estadoEquipoId}
          />
        </div>

        <div className="form-group mb-4">
          <Select
            id="estadoMotorId"
            name="estadoMotorId"
            placeholder="Estado Motor"
            label="Estado Motor"
            list={estadoMotorList}
            value={eemm?.estadoMotor?.id}
            onChange={handleChange}
            required={true}
            error={error?.estadoMotorId}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <InputText
            id="hrHistoricoMotor"
            name="hrHistoricoMotor"
            placeholder="Hrs histoóricas motor"
            label="Horas históricas motor"
            value={eemm?.hrHistoricoMotor}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error?.hrHistoricoMotor}
          />
        </div>

        <div className="form-group mb-4">
          <InputText
            id="hrHistoricoEquipo"
            name="hrHistoricoEquipo"
            placeholder="Hrs históricas equipo"
            label="Horas históricas equipo"
            value={eemm?.hrHistoricoEquipo}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error?.hrHistoricoEquipo}
          />
        </div>

        <div className="form-group mb-4">
          <Select
            id="motivoCambioId"
            name="motivoCambioId"
            placeholder="motivo Cambio"
            label="Motivo Cambio"
            list={motivoCambioList}
            value={eemm?.motivoCambio?.id}
            onChange={handleChange}
            required={true}
            error={error?.motivoCambioId}
          />
        </div>

        <div className="form-group mb-4">
          <Select
            id="tipoSalidaId"
            name="tipoSalidaId"
            placeholder="tipo salida"
            label="Tipo de salida"
            list={tipoSalidaList}
            value={eemm?.tipoSalida?.id}
            onChange={handleChange}
            required={true}
            error={error?.tipoSalidaId}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <Select
            id="contratoId"
            name="contratoId"
            placeholder="contrato"
            label="Contrato"
            list={tipoContratoList}
            value={eemm?.contrato?.id}
            onChange={handleChange}
            required={true}
            readOnly={true}
            error={error?.contratoId}
          />
        </div>
        <div className="form-group mb-4"></div>
        <div className="form-group mb-4">
          <Select
            id="adId"
            name="adId"
            placeholder="Aviso desmontaje"
            label="Aviso desmontaje"
            value={eemm?.ad?.id}
            list={adList}
            onChange={handleChange}
            required={true}
            error={error?.adId}
          />
        </div>

        <div className="form-group mb-4">
          <Select
            id="ubId"
            name="ubId"
            placeholder="ub"
            label="Ub"
            value={eemm?.ub?.id}
            list={ubList}
            onChange={handleChange}
            required={true}
            error={error?.ubId}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4"></div>
        <div className="form-group mb-4"></div>
        <div className="form-group mb-4">
          <InputText
            id="tsr"
            name="tsr"
            placeholder="tsr"
            label="TSR"
            value={eemm?.tsr}
            onChangeFN={handleChange}
            required={true}
            error={error?.tsr}
          />
        </div>
        <div className="form-group mb-4"></div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons NoModal={true} cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormDesmontaje;
