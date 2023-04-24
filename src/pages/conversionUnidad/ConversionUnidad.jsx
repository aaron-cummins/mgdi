import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ConversionUnidadContextProvider } from "./context/ConversionUnidadContext";

import FormConversionUnidad from "./components/FormConversionUnidad";
import TablaConversionUnidad from "./components/TablaConversionUnidad";

const ConversionUnidad = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <ConversionUnidadContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Conversión unidad">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#conversionunidad-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Conversión unidad
          </button>
        </Header>

        <TablaConversionUnidad openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Conversion unidad"
          modalId="conversionunidad-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormConversionUnidad closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </ConversionUnidadContextProvider>
  );
};

export default ConversionUnidad;
