import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { VistasGroupContextProvider } from "./context/vistasGroupContext";

import FormVistasGroup from "./components/FormVistasGroup";
import TablaVistasGroup from "./components/TablaVistasGroup";

const VistasGroup = () => {
  const { currentColor } = useStateContext();

  return (
    <VistasGroupContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Grupo de vistas">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#vistasgroup-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Grupo de vistas
          </button>
        </Header>

        <TablaVistasGroup />

        <Modal ModalTitle="Grupo de vistas" modalId="vistasgroup-modal">
          <FormVistasGroup />
        </Modal>
      </div>
    </VistasGroupContextProvider>
  );
};

export default VistasGroup;
