import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { VistasGroupContextProvider } from "./context/vistasGroupContext";

import FormVistasGroup from "./components/FormVistasGroup";
import TablaVistasGroup from "./components/TablaVistasGroup";

const VistasGroup = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <VistasGroupContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Grupo de vistas">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#vistasgroup-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Grupo de vistas
          </button>
        </Header>

        <TablaVistasGroup openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Grupo de vistas"
          modalId="vistasgroup-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormVistasGroup closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </VistasGroupContextProvider>
  );
};

export default VistasGroup;
