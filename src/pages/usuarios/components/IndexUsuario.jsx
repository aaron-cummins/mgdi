import React from "react";
import { Header, Modal } from "components";
import FormUsuario from "./FormUsuario";
import TablaUsuario from "./TablaUsuario";
import { useStateContext } from "contexts/ContextProvider";

const IndexUsuario = () => {
  const { currentColor } = useStateContext();
  return (
    <>
      <Header category="Administración" title="Usuario">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#usuario-modal"
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
          Nuevo Usuario
        </button>
      </Header>

      <TablaUsuario />

      <Modal ModalTitle="Usuario" modalId="usuario-modal">
        <FormUsuario />
      </Modal>
    </>
  );
};

export default IndexUsuario;
