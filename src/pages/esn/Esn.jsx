import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EsnContextProvider } from "./context/esnContext";

import FormEsn from "./components/FormEsn";
import TablaEsn from "./components/TablaEsn";

const Esn = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <EsnContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="ESN">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#esn-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Esn
          </button>
        </Header>

        <TablaEsn openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Aplicación" modalId="esn-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormEsn modalid="#esn-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </EsnContextProvider>
  );
};

export default Esn;
