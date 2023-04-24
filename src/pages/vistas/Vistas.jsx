import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { VistasContextProvider } from "./context/vistasContext";

import FormVistas from "./components/FormVistas";
import TablaVistas from "./components/TablaVistas";

const Vistas = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <VistasContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Vistas">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#vistas-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Vista
          </button>
        </Header>

        <TablaVistas openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Vistas" modalId="vistas-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormVistas closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </VistasContextProvider>
  );
};

export default Vistas;
