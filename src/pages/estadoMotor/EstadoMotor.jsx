import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EstadoMotorContextProvider } from "./context/EstadoMotorContext";

import FormEstadoMotor from "./components/FormEstadoMotor";
import TablaEstadoMotor from "./components/TablaEstadoMotor";

const EstadoMotor = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <EstadoMotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Estado motor ">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#estadomotor-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Estado Motor
          </button>
        </Header>

        <TablaEstadoMotor openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Estado Motor "
          modalId="estadomotor-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormEstadoMotor closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </EstadoMotorContextProvider>
  );
};

export default EstadoMotor;
