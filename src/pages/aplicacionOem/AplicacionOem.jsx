import React, { useState } from "react";
import { AplicacionOemContextProvider } from "./context/aplicacionOemContext";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import TablaAplicacionOem from "./components/TablaAplicacionOem";
import FormAplicacionOem from "./components/FormAplicacionOem";
const AplicacionOem = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <AplicacionOemContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Aplicación OEM">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#aplicacionoem-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3 hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Aplicación OEM
          </button>
        </Header>

        <TablaAplicacionOem openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Aplicación OEM"
          modalId="aplicacionoem-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormAplicacionOem closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </AplicacionOemContextProvider>
  );
};

export default AplicacionOem;
