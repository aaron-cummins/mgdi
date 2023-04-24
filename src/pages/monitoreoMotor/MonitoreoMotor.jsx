import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { MonitoreoMotorContextProvider } from "./context/monitoreoMotorContext";

import FormMonitoreoMotor from "./components/FormMonitoreoMotor";
import TablaMonitoreoMotor from "./components/TablaMonitoreoMotor";

const MonitoreoMotor = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <MonitoreoMotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Monitoreo Motor">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#monitoreomotor-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Monitoreo Motor
          </button>
        </Header>

        <TablaMonitoreoMotor openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Monitoreo Motor"
          modalId="monitoreomotor-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormMonitoreoMotor modalid="#monitoreomotor-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </MonitoreoMotorContextProvider>
  );
};

export default MonitoreoMotor;
