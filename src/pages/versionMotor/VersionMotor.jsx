import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { VersionMotorContextProvider } from "./context/versionMotorContext";

import FormVersionMotor from "./components/FormVersionMotor";
import TablaVersionMotor from "./components/TablaVersionMotor";

const VersionMotor = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <VersionMotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Versión Motor">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#versionmotor-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Versión Motor
          </button>
        </Header>

        <TablaVersionMotor openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Versión Motor"
          modalId="versionmotor-modal"
          dimension="xl"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormVersionMotor modalid="#versionmotor-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </VersionMotorContextProvider>
  );
};

export default VersionMotor;
