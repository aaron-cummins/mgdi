import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ConversionLugarTrabajoContextProvider } from "./context/ConversionLugarTrabajoContext";

import FormConversionLugarTrabajo from "./components/FormConversionLugarTrabajo";
import TablaConversionLugarTrabajo from "./components/TablaConversionLugarTrabajo";

const ConversionLugarTrabajo = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <ConversionLugarTrabajoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Conversión lugar trabajo">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#conversionlugartrabajo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Conversión Lugar de Trabajo
          </button>
        </Header>

        <TablaConversionLugarTrabajo openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="conversión lugar de trabajo"
          modalId="conversionlugartrabajo-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormConversionLugarTrabajo closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </ConversionLugarTrabajoContextProvider>
  );
};

export default ConversionLugarTrabajo;
