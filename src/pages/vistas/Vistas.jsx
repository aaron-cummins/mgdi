import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { VistasContextProvider } from "./context/vistasContext";

import FormVistas from "./components/FormVistas";
import TablaVistas from "./components/TablaVistas";

const Vistas = () => {
  const { currentColor } = useStateContext();

  return (
    <VistasContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Vistas">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#vistas-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Vista
          </button>
        </Header>

        <TablaVistas />

        <Modal ModalTitle="Vistas" modalId="vistas-modal">
          <FormVistas />
        </Modal>
      </div>
    </VistasContextProvider>
  );
};

export default Vistas;
