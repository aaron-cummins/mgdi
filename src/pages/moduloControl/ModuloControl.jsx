import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ModuloControlContextProvider } from "./context/moduloControlContext";

import FormModuloControl from "./components/FormModuloControl";
import TablaModuloControl from "./components/TablaModuloControl";

const ModuloControl = () => {
  const { currentColor } = useStateContext();
  return (
    <ModuloControlContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Módulo Control">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modulocontrol-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Módulo control
          </button>
        </Header>

        <TablaModuloControl />

        <Modal ModalTitle="Módulo control" modalId="modulocontrol-modal">
          <FormModuloControl />
        </Modal>
      </div>
    </ModuloControlContextProvider>
  );
};

export default ModuloControl;
