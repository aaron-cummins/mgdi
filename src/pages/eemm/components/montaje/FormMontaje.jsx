import { EemmContext } from "../../context/eemmContext";
import React, { useContext, useEffect } from "react";
import { Buttons, InputText, Select } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormMontaje = (props) => {
  const {
    obtenerEemm,
    registrarEemm,
    actualizarEemm,
    eemmActual,
    eemm,
    setEemm,
    eemmDefault,
    eemmUnidad,
    actualizarEsn,
    obtenerEemmEsnlist,
    obtenerEemmUnidadlist,
  } = useContext(EemmContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const {
    amList,
    estadoEquipoInstalacionList,
    estadoMotorInstalacionList,
    estadoEquipoList,
    estadoMotorList,
    tipoContratoList,
  } = useContext(SelectsContext);

  useEffect(() => {
    //eemmActual !== null ? setEemm(eemmActual) : setEemm(eemm);
    eemm ? setEemm(eemm) : setEemm(eemmDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eemmActual, eemm]);

  useEffect(() => {
    if (eemmUnidad.length > 0) {
      //let em = eemmUnidad[eemmUnidad.length - 1];
      let eemmAct = eemmDefault;
      let HHequipo = 0;

      eemmUnidad.forEach((item) => {
        HHequipo += item.hrOperadaMotor;
      });

      eemmAct.id = 0;
      eemmAct.lugarTrabajoId = eemm.lugarTrabajoId;
      eemmAct.flotaLugarTrabajoId = eemm.flotaLugarTrabajo.id;
      eemmAct.flotaLugarTrabajo = eemm.flotaLugarTrabajo;
      eemmAct.unidadId = eemm.unidad.id;
      eemmAct.unidad = eemm.unidad;
      eemmAct.esnId = eemm.esn?.id;
      eemmAct.esn = eemm.esn;

      /* eemmAct.lugarTrabajoId = eemm?.flotaLugarTrabajo?.lugarTrabajo?.id;
      eemmAct.flotaLugarTrabajoId = eemm?.flotaLugarTrabajo?.id;
      eemmAct.unidadId = eemm?.unidad?.id;
      eemmAct.esnId = eemm?.esn?.id;*/
      eemmAct.hrEquipoInstalacion = HHequipo;

      console.log(HHequipo);

      setEemm(eemmAct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eemmUnidad]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("fechaps", eemm.fechaps, "Debe seleccionar una fecha de puesta en servicio")) valida = false;
    if (validarNumero("hrEquipoInstalacion", eemm.hrEquipoInstalacion, "Debe ingresar horas validas")) valida = false;
    if (validarNumero("hrMotorInstalacion", eemm.hrMotorInstalacion, "Debe ingresar las horas de instalación"))
      valida = false;
    if (validarNumero("axial", eemm.axial, "Debe ingresar una medición axial (mm)")) valida = false;
    if (validarSelect("estadoEquipoInstalacionId", eemm.estadoEquipoInstalacion, "Debe seleccionar un estado"))
      valida = false;
    if (validarSelect("estadoMotorInstalacionId", eemm.estadoMotorInstalacion, "Debe seleccionar un estado"))
      valida = false;
    if (validarSelect("estadoEquipoId", eemm.estadoEquipo, "Debe seleccionar un estado")) valida = false;
    if (validarSelect("estadoMotorId", eemm.estadoMotor, "Debe seleccionar un estado")) valida = false;
    if (validarSelect("contratoId", eemm.contrato, "Debe seleccionar un contrato")) valida = false;
    if (validarNumero("intervencionId", eemm.intervencionId, "Debe ingresar un numero de intevención")) valida = false;
    if (validarSelect("amId", eemm.am, "Debe seleccionar un am")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") setEemm({ ...eemm, [name]: checked });
    else if (name === "estadoEquipoId") setEemm({ ...eemm, estadoEquipo: { id: value }, [name]: value });
    else if (name === "estadoMotorId") setEemm({ ...eemm, estadoMotor: { id: value }, [name]: value });
    else if (name === "estadoEquipoInstalacionId")
      setEemm({ ...eemm, estadoEquipoInstalacion: { id: value }, [name]: value });
    else if (name === "estadoMotorInstalacionId")
      setEemm({ ...eemm, estadoMotorInstalacion: { id: value }, [name]: value });
    else if (name === "contratoId") setEemm({ ...eemm, contrato: { id: value }, [name]: value });
    else if (name === "esnId") setEemm({ ...eemm, esn: { id: value }, [name]: value });
    else if (name === "amId") setEemm({ ...eemm, am: { id: value }, [name]: value });
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
    if (validaciones()) {
      //eemmActual !== null ? actualizarEemm(MontajeAEnviar(), true) : registrarEemm(MontajeAEnviar(), true);

      eemm.id !== 0 ? actualizarEemm(MontajeAEnviar(), false) : registrarEemm(MontajeAEnviar(), false);

      actualizarEsn(eemm.esn.id, true).then((item) => {
        obtenerEemmEsnlist(eemm.esn.id);
        obtenerEemmUnidadlist(eemm.unidad.id);
      });

      //limpiaForm();

      //limpiaForm();
      //closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const MontajeAEnviar = () => {
    let montajeTmp = { ...eemm };

    montajeTmp.estadoEquipoInstalacionId = eemm.estadoEquipoInstalacion.id;
    montajeTmp.estadoMotorInstalacionId = eemm.estadoMotorInstalacion.id;
    montajeTmp.estadoEquipoId = eemm.estadoEquipo.id;
    montajeTmp.estadoMotorId = eemm.estadoMotor.id;
    montajeTmp.contratoId = eemm.contrato.id;
    montajeTmp.amId = eemm.am.id;
    montajeTmp.activo = true;

    return montajeTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <InputText
            type="date"
            id="fechaps"
            name="fechaps"
            placeholder="Fecha PS"
            label="Fecha puesta en servicio"
            value={eemm?.fechaps}
            onChangeFN={handleChange}
            required={true}
            error={error?.fechaps}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="hrEquipoInstalacion"
            name="hrEquipoInstalacion"
            placeholder="Hrs Equipo en instalación"
            label="Horas Equipo en instalación"
            value={eemm?.hrEquipoInstalacion}
            onChangeFN={handleChange}
            required={true}
            error={error?.hrEquipoInstalacion}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="hrMotorInstalacion"
            name="hrMotorInstalacion"
            placeholder="Hrs Motor en instalación"
            label="Horas Motor en instalación"
            value={eemm?.hrMotorInstalacion}
            onChangeFN={handleChange}
            required={true}
            error={error?.hrMotorInstalacion}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="axial"
            name="axial"
            placeholder="Medición axial (mm)"
            label="Medición axial (mm)"
            value={eemm?.axial}
            onChangeFN={handleChange}
            required={true}
            error={error?.axial}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <Select
            id="estadoEquipoInstalacionId"
            name="estadoEquipoInstalacionId"
            placeholder="Estado Equipo instalación"
            label="Estado Equipo instalación"
            list={estadoEquipoInstalacionList}
            value={eemm?.estadoEquipoInstalacion?.id}
            onChange={handleChange}
            required={true}
            error={error?.estadoEquipoInstalacionId}
          />
        </div>

        <div className="form-group mb-4">
          <Select
            id="estadoMotorInstalacionId"
            name="estadoMotorInstalacionId"
            placeholder="Estado Motor instalación"
            label="Estado Motor instalación"
            list={estadoMotorInstalacionList}
            value={eemm?.estadoMotorInstalacion?.id}
            onChange={handleChange}
            required={true}
            error={error?.estadoMotorInstalacionId}
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
            error={error?.contratoId}
          />
        </div>

        <div className="form-group mb-4">
          <InputText
            id="intervencionId"
            name="intervencionId"
            placeholder="Correlativo Intervención"
            label="Correlativo Intervención"
            value={eemm?.intervencionId}
            onChangeFN={handleChange}
            required={true}
            error={error?.intervencionId}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="amId"
            name="amId"
            placeholder="Aviso montaje"
            label="Aviso montaje"
            value={eemm?.am?.id}
            list={amList}
            onChange={handleChange}
            required={true}
            error={error?.amId}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons NoModal={true} cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormMontaje;
