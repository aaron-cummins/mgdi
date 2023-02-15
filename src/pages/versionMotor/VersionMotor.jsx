import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { VersionMotorContextProvider } from "./context/versionMotorContext";

import FormVersionMotor from "./components/FormVersionMotor";
import TablaVersionMotor from "./components/TablaVersionMotor";

const VersionMotor = () => {
  const { currentColor } = useStateContext();
  return (
    <VersionMotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Versión Motor">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#versionmotor-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Versión Motor
          </button>
        </Header>

        <TablaVersionMotor />

        <Modal ModalTitle="Versión Motor" modalId="versionmotor-modal" dimension="xl">
          <FormVersionMotor modalid="#versionmotor-modal" />
        </Modal>
      </div>
    </VersionMotorContextProvider>
  );
};

export default VersionMotor;
