import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { MotorContextProvider } from "./context/motorContext";

import FormMotor from "./components/FormMotor";
import TablaMotor from "./components/TablaMotor";

const Motor = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <MotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Motor">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#motor-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Motor
          </button>
        </Header>

        <TablaMotor openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Motor" modalId="motor-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormMotor closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </MotorContextProvider>
  );
};

export default Motor;
