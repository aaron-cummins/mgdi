import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { RolesContextProvider } from "./context/rolesContext";

import FormRoles from "./components/FormRoles";
import TablaRoles from "./components/TablaRoles";

const Roles = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <RolesContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Roles">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#roles-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Rol
          </button>
        </Header>

        <TablaRoles openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Roles" modalId="roles-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormRoles closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </RolesContextProvider>
  );
};

export default Roles;
