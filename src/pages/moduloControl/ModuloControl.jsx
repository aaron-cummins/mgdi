import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ModuloControlContextProvider } from "./context/moduloControlContext";

import FormModuloControl from "./components/FormModuloControl";
import TablaModuloControl from "./components/TablaModuloControl";

const ModuloControl = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <ModuloControlContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Módulo Control">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#modulocontrol-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Módulo control
          </button>
        </Header>

        <TablaModuloControl openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Módulo control"
          modalId="modulocontrol-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormModuloControl closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </ModuloControlContextProvider>
  );
};

export default ModuloControl;
