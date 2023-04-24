import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, Buttons, Select } from "components";
import { PermisosGlobalesContext } from "../context/permisosGlobalesContext";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";

const FormPermisoGlobal = ({ closeModal }) => {
  const { registrarPermisoGlobal, permisoGlobalActual, actualizarPermisoGlobal, obtenerPermisoGlobal } =
    useContext(PermisosGlobalesContext);
  const { modulosList, rolesList } = useContext(SelectsContext);
  const { mensaje } = useStateContext();
  const permisoGlobalDefault = useMemo(() => {
    return {
      id: 0,
      rolID: 0,
      moduloID: 0,
    };
  }, []);

  const [PermisoGlobal, setPermisoGlobal] = useState(permisoGlobalDefault);

  useEffect(() => {
    permisoGlobalActual ? setPermisoGlobal(permisoGlobalActual) : setPermisoGlobal(permisoGlobalDefault);
  }, [permisoGlobalActual, permisoGlobalDefault]);

  const handleChange = (e) => {
    setPermisoGlobal({
      ...PermisoGlobal,
      [e.target.name]: e.target.value,
    });
  };

  const limpiaForm = () => {
    setPermisoGlobal(permisoGlobalDefault);
    obtenerPermisoGlobal(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    permisoGlobalActual !== null
      ? actualizarPermisoGlobal(PermisoGlobalAEnviar())
      : registrarPermisoGlobal(PermisoGlobalAEnviar());
    limpiaForm();
    closeModal();
  };

  const PermisoGlobalAEnviar = () => {
    let PermisoGlobalTmp = { ...PermisoGlobal };
    return PermisoGlobalTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <Select
            id="moduloId"
            name="moduloId"
            value={PermisoGlobal.moduloId}
            label="Modulo"
            list={modulosList}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <Select
            id="rolId"
            name="rolId"
            value={PermisoGlobal.rolId}
            label="Rol"
            list={rolesList}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormPermisoGlobal;
