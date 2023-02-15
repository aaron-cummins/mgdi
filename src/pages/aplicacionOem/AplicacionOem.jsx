import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { AplicacionOemContextProvider } from "./context/aplicacionOemContext";

import FormAplicacionOem from "./components/FormAplicacionOem";
import TablaAplicacionOems from "./components/TablaAplicacionOem";
const AplicacionOem = () => {
  const { currentColor } = useStateContext();
  return (
    <AplicacionOemContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Aplicación OEM">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#aplicacionoem-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            {" "}
            Nueva Aplicación OEM
          </button>
        </Header>

        <TablaAplicacionOems />

        <Modal ModalTitle="Aplicación OEM" modalId="aplicacionoem-modal">
          <FormAplicacionOem />
        </Modal>
      </div>
    </AplicacionOemContextProvider>
  );
};

export default AplicacionOem;
