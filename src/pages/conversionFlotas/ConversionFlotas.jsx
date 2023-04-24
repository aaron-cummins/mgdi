import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ConversionFlotasContextProvider } from "./context/ConversionFlotasContext";

import FormConversionFlotas from "./components/FormConversionFlotas";
import TablaConversionFlotas from "./components/TablaConversionFlotas";

const ConversionFlotas = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <ConversionFlotasContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Conversión flotas">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#conversionflotas-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Conversión Flotas
          </button>
        </Header>

        <TablaConversionFlotas openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Conversión Flotas"
          modalId="conversionflotas-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormConversionFlotas closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </ConversionFlotasContextProvider>
  );
};

export default ConversionFlotas;
