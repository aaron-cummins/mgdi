import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { AvisoMontajeContextProvider } from "./context/avisoMontajeContext";

import FormAvisoMontaje from "./components/FormAvisoMontaje";
import TablaAvisoMontaje from "./components/TablaAvisoMontaje";

const AvisoMontaje = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <AvisoMontajeContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Aviso Montaje">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#am-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Aviso Montaje
          </button>
        </Header>

        <TablaAvisoMontaje openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Aviso Montaje" modalId="am-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormAvisoMontaje modalid="#am-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </AvisoMontajeContextProvider>
  );
};

export default AvisoMontaje;
