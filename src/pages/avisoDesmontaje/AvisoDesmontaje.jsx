import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { AvisoDesmontajeContextProvider } from "./context/avisoDesmontajeContext";

import FormAvisoDesmontaje from "./components/FormAvisoDesmontaje";
import TablaAvisoDesmontaje from "./components/TablaAvisoDesmontaje";

const AvisoDesmontaje = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <AvisoDesmontajeContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Aviso Desmontaje">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#ad-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Aviso Desmontaje
          </button>
        </Header>

        <TablaAvisoDesmontaje openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Aviso Desmontaje" modalId="ad-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormAvisoDesmontaje modalid="#ad-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </AvisoDesmontajeContextProvider>
  );
};

export default AvisoDesmontaje;
