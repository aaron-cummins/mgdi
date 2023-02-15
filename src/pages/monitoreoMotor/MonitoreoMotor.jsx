import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { MonitoreoMotorContextProvider } from "./context/monitoreoMotorContext";

import FormMonitoreoMotor from "./components/FormMonitoreoMotor";
import TablaMonitoreoMotor from "./components/TablaMonitoreoMotor";

const MonitoreoMotor = () => {
  const { currentColor } = useStateContext();
  return (
    <MonitoreoMotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Monitoreo Motor">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#monitoreomotor-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Monitoreo Motor
          </button>
        </Header>

        <TablaMonitoreoMotor />

        <Modal ModalTitle="Monitoreo Motor" modalId="monitoreomotor-modal">
          <FormMonitoreoMotor modalid="#monitoreomotor-modal" />
        </Modal>
      </div>
    </MonitoreoMotorContextProvider>
  );
};

export default MonitoreoMotor;
