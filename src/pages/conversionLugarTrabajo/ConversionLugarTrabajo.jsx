import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ConversionLugarTrabajoContextProvider } from "./context/ConversionLugarTrabajoContext";

import FormConversionLugarTrabajo from "./components/FormConversionLugarTrabajo";
import TablaConversionLugarTrabajo from "./components/TablaConversionLugarTrabajo";

const ConversionLugarTrabajo = () => {
  const { currentColor } = useStateContext();
  return (
    <ConversionLugarTrabajoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Conversión lugar trabajo">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#conversionlugartrabajo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Conversión Lugar de Trabajo
          </button>
        </Header>

        <TablaConversionLugarTrabajo />

        <Modal ModalTitle="conversión lugar de trabajo" modalId="conversionlugartrabajo-modal">
          <FormConversionLugarTrabajo />
        </Modal>
      </div>
    </ConversionLugarTrabajoContextProvider>
  );
};

export default ConversionLugarTrabajo;
