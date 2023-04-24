import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { UbContextProvider } from "./context/ubContext";

import FormUb from "./components/FormUb";
import TablaUb from "./components/TablaUb";

const Ub = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <UbContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Ub">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#ub-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva UB
          </button>
        </Header>

        <TablaUb openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Ub" modalId="ub-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormUb modalid="#ub-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </UbContextProvider>
  );
};

export default Ub;
