import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { OemContextProvider } from "./context/oemContext";

import FormOem from "./components/FormOem";
import TablaOem from "./components/TablaOem";

const Oem = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <OemContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="OEM">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#oem-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo OEM
          </button>
        </Header>

        <TablaOem openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="OEM" modalId="oem-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormOem closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </OemContextProvider>
  );
};

export default Oem;
