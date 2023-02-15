import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { OemContextProvider } from "./context/oemContext";

import FormOem from "./components/FormOem";
import TablaOem from "./components/TablaOem";

const Oem = () => {
  const { currentColor } = useStateContext();
  return (
    <OemContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="OEM">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#oem-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo OEM
          </button>
        </Header>

        <TablaOem />

        <Modal ModalTitle="OEM" modalId="oem-modal">
          <FormOem />
        </Modal>
      </div>
    </OemContextProvider>
  );
};

export default Oem;
