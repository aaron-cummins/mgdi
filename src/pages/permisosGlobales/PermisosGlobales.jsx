import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { PermisosGlobalesContextProvider } from "./context/permisosGlobalesContext";

import FormPermisoGlobal from "./components/FormPermisoGlobal";
import TablaPermisoGlobal from "./components/TablaPermisoGlobal";

const PermisosGlobales = () => {
  const { currentColor } = useStateContext();
  return (
    <PermisosGlobalesContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Permisos Globales">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#PermisoGlobal-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Permiso Global
          </button>
        </Header>

        <TablaPermisoGlobal />

        <Modal ModalTitle="Permisos Globales" modalId="PermisoGlobal-modal">
          <FormPermisoGlobal />
        </Modal>
      </div>
    </PermisosGlobalesContextProvider>
  );
};

export default PermisosGlobales;
