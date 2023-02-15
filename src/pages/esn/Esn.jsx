import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EsnContextProvider } from "./context/esnContext";

import FormEsn from "./components/FormEsn";
import TablaEsn from "./components/TablaEsn";

const Esn = () => {
  const { currentColor } = useStateContext();
  return (
    <EsnContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="ESN">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#esn-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Esn
          </button>
        </Header>

        <TablaEsn />

        <Modal ModalTitle="Aplicación" modalId="esn-modal">
          <FormEsn modalid="#esn-modal" />
        </Modal>
      </div>
    </EsnContextProvider>
  );
};

export default Esn;
