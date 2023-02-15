import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, Select, Switch } from "components";
import { EsnContext } from "../context/esnContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormEsn = () => {
  const { registrarEsn, esnActual, actualizarEsn, obtenerEsn } = useContext(EsnContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const { versionMotorList } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const esnDefault = useMemo(() => {
    return {
      id: 0,
      esn: "",
      esnPlaca: "",
      usuarioId: 0,
      usuario: {
        id: 0,
      },
      montado: false,
      versionMotorId: 0,
      versionMotor: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [esn, setEsn] = useState(esnDefault);

  useEffect(() => {
    esnActual !== null ? setEsn(esnActual) : setEsn(esnDefault);
  }, [esnActual, esnDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", esn.esn, "ESN requerido")) valida = false;
    if (validarTexto("nombre", esn.esnPlaca, "ESN placa")) valida = false;
    if (validarSelect("versionMotorId", esn.versionMotor, "Debe seleccionar una versión motor")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setEsn({ ...esn, [name]: checked });
    else if (name === "versionMotorId") setEsn({ ...esn, versionMotor: { id: value } });
    else setEsn({ ...esn, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setEsn(esnDefault);
    obtenerEsn(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      esnActual !== null ? actualizarEsn(EsnAEnviar()) : registrarEsn(EsnAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const EsnAEnviar = () => {
    let esnTmp = { ...esn };
    esnTmp.versionMotorId = esn.versionMotor.id;
    esnTmp.usuarioId = 1;
    return esnTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="esn"
            name="esn"
            placeholder="ESN"
            label="ESN"
            value={esn.esn}
            onChangeFN={handleChange}
            required={true}
            error={error.esn}
          />
        </div>
        <div className="form-group mb-6">
          <InputText
            id="esnPlaca"
            name="esnPlaca"
            placeholder="ESN Placa"
            label="ESN placa"
            value={esn.esnPlaca}
            onChangeFN={handleChange}
            required={true}
            error={error.esnPlaca}
          />
        </div>
        <div className="form-group mb-4">
          <Switch label="montado" id="montado" name="montado" onChange={handleChange} checked={esn.montado}></Switch>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-6">
          <Select
            id="versionMotorId"
            name="versionMotorId"
            placeholder="versionMotorId"
            label="version Motor"
            value={esn.versionMotor?.id}
            onChange={handleChange}
            required={true}
            list={versionMotorList}
            error={error.versionMotorId}
          />
        </div>

        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={esn.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEsn;
