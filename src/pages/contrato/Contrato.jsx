import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ContratoContextProvider } from "./context/contratoContext";

import FormContrato from "./components/FormContrato";
import TablaContrato from "./components/TablaContrato";

const Contrato = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <ContratoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Contrato">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#contrato-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Contrato
          </button>
        </Header>

        <TablaContrato openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Contrato" modalId="contrato-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormContrato closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </ContratoContextProvider>
  );
};

export default Contrato;
