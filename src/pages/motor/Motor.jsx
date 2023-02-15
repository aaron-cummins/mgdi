import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { MotorContextProvider } from "./context/motorContext";

import FormMotor from "./components/FormMotor";
import TablaMotor from "./components/TablaMotor";

const Motor = () => {
  const { currentColor } = useStateContext();

  return (
    <MotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Motor">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#motor-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Motor
          </button>
        </Header>

        <TablaMotor />

        <Modal ModalTitle="Motor" modalId="motor-modal">
          <FormMotor />
        </Modal>
      </div>
    </MotorContextProvider>
  );
};

export default Motor;
