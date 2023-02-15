import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EstadoMotorContextProvider } from "./context/EstadoMotorContext";

import FormEstadoMotor from "./components/FormEstadoMotor";
import TablaEstadoMotor from "./components/TablaEstadoMotor";

const EstadoMotor = () => {
  const { currentColor } = useStateContext();
  return (
    <EstadoMotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Estado motor ">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#estadomotor-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Estado Motor
          </button>
        </Header>

        <TablaEstadoMotor />

        <Modal ModalTitle="Estado Motor " modalId="estadomotor-modal">
          <FormEstadoMotor />
        </Modal>
      </div>
    </EstadoMotorContextProvider>
  );
};

export default EstadoMotor;
