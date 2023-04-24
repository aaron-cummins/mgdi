import React, { useState } from "react";
import { UnidadContextProvider } from "./context/unidadContext";
import { useStateContext } from "contexts/ContextProvider";
import { Header, Modal } from "components";
import TablaUnidad from "./components/TablaUnidad";
import FormUnidad from "./components/FormUnidad";

const Unidad = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <UnidadContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Unidad">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#unidad-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Unidad
          </button>
        </Header>

        <TablaUnidad openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Unidad"
          modalId="unidad-modal"
          dimension="xl"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormUnidad modalid="#unidad-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </UnidadContextProvider>
  );
};

export default Unidad;
