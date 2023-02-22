import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { MotivoCambioContextProvider } from "./context/MotivoCambioContext";

import FormMotivoCambio from "./components/FormMotivoCambio";
import TablaMotivoCambio from "./components/TablaMotivoCambio";

const MotivoCambio = () => {
  const { currentColor } = useStateContext();
  return (
    <MotivoCambioContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Motivo cambio">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#motivocambio-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Motivo Cambio
          </button>
        </Header>

        <TablaMotivoCambio />

        <Modal ModalTitle="Motivo Cambio" modalId="motivocambio-modal">
          <FormMotivoCambio />
        </Modal>
      </div>
    </MotivoCambioContextProvider>
  );
};

export default MotivoCambio;
