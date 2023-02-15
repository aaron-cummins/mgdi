import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { RolesContextProvider } from "./context/rolesContext";

import FormRoles from "./components/FormRoles";
import TablaRoles from "./components/TablaRoles";

const Roles = () => {
  const { currentColor } = useStateContext();
  return (
    <RolesContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Roles">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#roles-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Rol
          </button>
        </Header>

        <TablaRoles />

        <Modal ModalTitle="Roles" modalId="roles-modal">
          <FormRoles />
        </Modal>
      </div>
    </RolesContextProvider>
  );
};

export default Roles;
