import React, { useState } from "react";
import { Header, Modal } from "components";
import FormUsuario from "./FormUsuario";
import TablaUsuario from "./TablaUsuario";
import { useStateContext } from "contexts/ContextProvider";

const IndexUsuario = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Header category="Administración" title="Usuario">
        <button
          type="button"
          data-te-toggle="modal"
          data-te-ripple-init
          data-te-target="#usuario-modal"
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          onClick={() => setOpenModal(true)}
          className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
          Nuevo Usuario
        </button>
      </Header>

      <TablaUsuario openModal={() => setOpenModal(true)} />

      <Modal ModalTitle="Usuario" modalId="usuario-modal" open={openModal} onClose={() => setOpenModal(false)}>
        <FormUsuario closeModal={() => setOpenModal(false)} />
      </Modal>
    </>
  );
};

export default IndexUsuario;
