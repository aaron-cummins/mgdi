import React, { useEffect, useMemo, useState } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { UsuarioContext } from "../context/usuarioContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormUsuario = () => {
  const { registrarUsuario, usuarioActual, actualizarUsuario, obtenerUsuario } = useContext(UsuarioContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const {
    cargosList,
  } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError, validarMail, validarTelefono, validarUId, validacionRut} = useValidacionForm();

  const usuarioDefault = useMemo(() => {
    return {
      id: 0,
      rut: "",
      uid: "",
      nombres: "",
      apellidos: "",
      correo: "",
      telefono: "",
      anexo: "",
      password: "",
      cargoId: 0,
      cargo: {
        id: 0,
      },
      lugarTrabajoId: 0,
      lugarTrabajo: {
        id: 0,
      },
      id_lugar_trabajo: 0,
      created_at: Date.now,
      updated_at: Date.now,
      activo: false,
    };
  }, []);

  const [usuario, setUsuario] = useState(usuarioDefault);
  //const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    usuarioActual !== null ? setUsuario(usuarioActual) : setUsuario(usuarioDefault);
  }, [usuarioActual, usuarioDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombres", usuario.nombres, "Nombres requeridos")) valida = false;
    if (validarTexto("apellidos", usuario.apellidos, "Apellidos requeridos")) valida = false;

    if (validarTexto("rut", usuario.rut, "Rut requerido")) valida = false;
    if (validacionRut("rut", usuario.rut, "Rut incorrecto. Inténtelo nuevamente")) valida = false;

    if (validarTexto("uid", usuario.uid, "UID requerido")) valida = false;
    if (validarUId("uid", usuario.uid, "UID incorrecto. Inténtelo nuevamente")) valida = false;

    if (validarTexto("correo", usuario.correo, "Correo corporativo requerido")) valida = false;
    if (validarMail("correo", usuario.correo, "Correo corporativo incorrecto. Inténtelo nuevamente")) valida = false

    if (validarTexto("telefono", usuario.telefono, "Teléfono requerido")) valida = false;
    if (validarTelefono("telefono", usuario.telefono, "Teléfono incorrecto. Inténtelo nuevamente")) valida = false

    if (validarTexto("anexo", usuario.anexo, "Anexo requerido")) valida = false;
    if (validarSelect("cargoId", usuario.cargo, "Debe seleccionar una conversión de flotas")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setUsuario({ ...usuario, [name]: checked });
    else if (name === "cargoId") setUsuario({ ...usuario, cargo: { id: value } }); 
    else setUsuario({ ...usuario, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setUsuario(usuarioDefault);
    obtenerUsuario(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      usuarioActual !== null
        ? actualizarUsuario(UsuarioAEnviar())
        : registrarUsuario(UsuarioAEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const UsuarioAEnviar = () => {
    let usuarioTmp = { ...usuario };
    usuarioTmp.cargoId = usuario.cargo.id;
    return usuarioTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            id="nombres"
            name="nombres"
            label="Nombres"
            placeholder="Nombres"
            value={usuario.nombres}
            onChangeFN={handleChange}
            required={true}
            error={error.nombres}
          />
        </div>
        <div className="form-group mb-2">
          <InputText
            id="apellidos"
            name="apellidos"
            placeholder="Apellidos"
            label="Apellidos"
            value={usuario.apellidos}
            onChangeFN={handleChange}
            required={true}
            error={error.apellidos}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            id="rut"
            name="rut"
            placeholder="Rut"
            label="Rut (sin punto y con dígito verificador)"
            value={usuario.rut}
            onChangeFN={handleChange}
            required={true}
            error={error.rut}
          />
        </div>
        <div className="form-group mb-2">
          <InputText
            id="uid"
            name="uid"
            placeholder="UId"
            label="UId"
            value={usuario.uid}
            onChangeFN={handleChange}
            required={true}
            error={error.uid}
          />
        </div>
      </div>

      <div className="form-group mb-2">
        <InputText
          type="email"
          id="correo"
          name="correo"
          placeholder="Nombre@cummins.cl"
          label="Correo"
          value={usuario.correo}
          onChangeFN={handleChange}
          required={true}
          error={error.correo}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="(Código de área) Número"
            label="Telefono (9 dígitos)"
            value={usuario.telefono}
            onChangeFN={handleChange}
            error={error.telefono}
          />
        </div>
        <div className="form-group mb-2">
          <InputText
            id="anexo"
            name="anexo"
            placeholder="Anexo"
            label="Anexo"
            value={usuario.anexo}
            onChangeFN={handleChange}
            error={error.anexo}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <Select
            id="cargoId"
            name="cargoId"
            placeholder="Cargo"
            value={usuario.cargo.id}
            onChange={handleChange}
            label="Cargo"
            list={cargosList}
            required={true}
            error={error.cargoId}
          />
        </div>
      </div>

      <div className="form-group mb-2">
        <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={usuario.activo} />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormUsuario;
