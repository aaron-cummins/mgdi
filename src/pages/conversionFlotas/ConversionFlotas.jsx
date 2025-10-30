import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ConversionFlotasContextProvider } from "./context/ConversionFlotasContext";

import FormConversionFlotas from "./components/FormConversionFlotas";
import TablaConversionFlotas from "./components/TablaConversionFlotas";

const ConversionFlotas = () => {
  const { currentColor } = useStateContext();
  return (
    <ConversionFlotasContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Conversión flotas">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#conversionflotas-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px"
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Conversión Flotas
          </button>
        </Header>

        <TablaConversionFlotas />

        <Modal ModalTitle="Conversión Flotas" modalId="conversionflotas-modal">
          <FormConversionFlotas />
        </Modal>
      </div>
    </ConversionFlotasContextProvider>
  );
};

export default ConversionFlotas;
