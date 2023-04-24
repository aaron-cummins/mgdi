import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import { Buttons, Checkbox, InputText, Select } from "components";
import { formatDate, formatDateshort } from "utilities/Utiles";
import { SelectsContext } from "contexts/SelectsContext";
import { ContratoContext } from "../context/contratoContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormContrato = ({ closeModal }) => {
  const {
    obtenerFlotasLugarTrabajo,
    tipoContratoList,
    monitoreoFiltroList,
    monitoreoMotorList,
    lugarTrabajoUsuarioList,
    flotasLugarTrabajoList,
  } = useContext(SelectsContext);
  const { enqueueSnackbar } = useSnackbar();
  const { obtenerContrato, contratoActual, registrarContrato, actualizarContrato } = useContext(ContratoContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const contatoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      lugarTrabajoId: 0,
      lugarTrabajo: {
        id: 0,
      },
      tipoContratoId: 0,
      tipoContrato: {
        id: 0,
      },
      lt: 0,
      flotasLugarTrabajoId: 0,
      flotaLugarTrabajo: {
        id: 0,
        lugarTrabajo: {
          id: 0,
        },
      },
      fechaInicio: formatDate(Date(Date.now)),
      duracion: 0,
      fechaCobro: formatDate(Date(Date.now)),
      accesoPool: false,
      monitoreoMotorId: 0,
      monitoreoMotor: {
        id: 0,
      },
      monitoreoFiltroId: 0,
      monitoreoFiltro: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [contrato, setContrato] = useState(contatoDefault);

  useEffect(() => {
    if (contratoActual !== null) {
      contratoActual.lugarTrabajo = contratoActual.flotaLugarTrabajo.lugarTrabajo;
      setContrato(contratoActual);
      obtenerFlotasLugarTrabajo(contratoActual.flotaLugarTrabajo?.id);
    } else setContrato(contatoDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contratoActual, contatoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", contrato.nombre, "Nombre de contrato requerido")) valida = false;
    if (validarNumero("duracion", contrato.duracion, "Duración requerida")) valida = false;
    if (validarSelect("tipoContratoId", contrato.tipoContrato, "Debe seleccionar un tipo de contrato")) valida = false;
    if (validarSelect("lugarTrabajoId", contrato.lugarTrabajo, "Debe seleccionar un lugar de trabajo")) valida = false;
    if (
      validarSelect("flotasLugarTrabajoId", contrato.flotaLugarTrabajo, "Debe seleccionar una flota lugar de trabajo")
    )
      valida = false;
    if (validarSelect("monitoreoFiltroId", contrato.monitoreoFiltro, "Debe seleccionar un monitoreo de filtro"))
      valida = false;
    if (validarSelect("monitoreoMotorId", contrato.monitoreoMotor, "Debe seleccionar un monitoreo de motor"))
      valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setContrato({ ...contrato, [name]: checked });
    else if (name === "lugarTrabajoId") {
      setContrato({ ...contrato, [name]: value, lugarTrabajo: { id: value } });
      obtenerFlotasLugarTrabajo(value);
    } else if (name === "flotasLugarTrabajoId")
      setContrato({ ...contrato, [name]: value, flotaLugarTrabajo: { id: value } });
    else if (name === "tipoContratoId") setContrato({ ...contrato, tipoContrato: { id: value }, [name]: value });
    else if (name === "monitoreoFiltroId") setContrato({ ...contrato, monitoreoFiltro: { id: value }, [name]: value });
    else if (name === "monitoreoMotorId") setContrato({ ...contrato, monitoreoMotor: { id: value }, [name]: value });
    else setContrato({ ...contrato, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    obtenerContrato(null);
    setContrato(contatoDefault);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      contratoActual !== null
        ? actualizarContrato(contratoAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }))
        : registrarContrato(contratoAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }));

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const contratoAEnviar = () => {
    let contratoTmp = { ...contrato };
    contratoTmp.flotasLugarTrabajoId = contratoTmp.flotaLugarTrabajo.id;
    contratoTmp.tipoContratoId = contrato.tipoContrato.id;
    contratoTmp.flotasLugarTrabajoId = contrato.flotaLugarTrabajo.id;
    contratoTmp.monitoreoFiltroId = contrato.monitoreoFiltro.id;
    contratoTmp.monitoreoMotorId = contrato.monitoreoMotor.id;

    return contratoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group mb-2">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={contrato.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-2">
          <Select
            id="tipoContratoId"
            name="tipoContratoId"
            placeholder="tipo Contrato"
            value={contrato.tipoContrato?.id}
            onChange={handleChange}
            required={true}
            label="Tipo contrato"
            list={tipoContratoList}
            error={error.tipoContratoId}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group mb-2">
          <Select
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar trabajo"
            value={contrato.lugarTrabajo?.id}
            onChange={handleChange}
            required={true}
            label="Lugar trabajo"
            list={lugarTrabajoUsuarioList}
            error={error.lugarTrabajoId}
          />
        </div>
        <div className="form-group mb-2">
          <Select
            id="flotasLugarTrabajoId"
            name="flotasLugarTrabajoId"
            placeholder="flotas Lugar Trabajo"
            value={contrato.flotaLugarTrabajo?.id}
            onChange={handleChange}
            required={true}
            label="Flotas lugar trabajo"
            list={flotasLugarTrabajoList}
            error={error.flotasLugarTrabajoId}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group mb-2">
          <InputText
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            placeholder="Fecha Inicio"
            label="Fecha Inicio"
            value={contrato.fechaInicio ? formatDateshort(contrato.fechaInicio) : ""}
            onChangeFN={handleChange}
            required={true}
            error={error.fechaInicio}
          />
        </div>
        <div className="form-group mb-2">
          <InputText
            id="duracion"
            name="duracion"
            placeholder="Duración"
            label="Duración"
            value={contrato.duracion}
            onChangeFN={handleChange}
            required={true}
            error={error.duracion}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group mb-2">
          <InputText
            type="date"
            id="fechaCobro"
            name="fechaCobro"
            placeholder="Fecha Cobro"
            label="Fecha Cobro"
            value={contrato.fechaCobro ? formatDateshort(contrato.fechaCobro) : ""}
            onChangeFN={handleChange}
            required={true}
            error={error.fechaCobro}
          />
        </div>
        <div className="form-group mb-2">
          <Checkbox
            id="accesoPool"
            name="accesoPool"
            label="Acceso Pool"
            onChangeFN={handleChange}
            checked={contrato.accesoPool}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group mb-2">
          <Select
            id="monitoreoFiltroId"
            name="monitoreoFiltroId"
            placeholder="monitoreo Filtro"
            label="Monitoreo Filtro"
            value={contrato.monitoreoFiltro?.id}
            onChange={handleChange}
            required={true}
            list={monitoreoFiltroList}
            error={error.monitoreoFiltroId}
          />
        </div>
        <div className="form-group mb-2">
          <Select
            id="monitoreoMotorId"
            name="monitoreoMotorId"
            placeholder="Monitoreo Motor"
            value={contrato.monitoreoMotor?.id}
            onChange={handleChange}
            required={true}
            label="Monitoreo motor"
            list={monitoreoMotorList}
            error={error.monitoreoMotorId}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={contrato.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormContrato;
