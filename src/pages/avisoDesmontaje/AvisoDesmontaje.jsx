import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { AvisoDesmontajeContextProvider } from "./context/avisoDesmontajeContext";

import FormAvisoDesmontaje from "./components/FormAvisoDesmontaje";
import TablaAvisoDesmontaje from "./components/TablaAvisoDesmontaje";

const AvisoDesmontaje = () => {
  const { currentColor } = useStateContext();
  return (
    <AvisoDesmontajeContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Aviso Desmontaje">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#ad-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Aviso Desmontaje
          </button>
        </Header>

        <TablaAvisoDesmontaje />

        <Modal ModalTitle="Aviso Desmontaje" modalId="ad-modal">
          <FormAvisoDesmontaje modalid="#ad-modal" />
        </Modal>
      </div>
    </AvisoDesmontajeContextProvider>
  );
};

export default AvisoDesmontaje;
