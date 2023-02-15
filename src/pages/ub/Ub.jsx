import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { UbContextProvider } from "./context/ubContext";

import FormUb from "./components/FormUb";
import TablaUb from "./components/TablaUb";

const Ub = () => {
  const { currentColor } = useStateContext();
  return (
    <UbContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Ub">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#ub-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva UB
          </button>
        </Header>

        <TablaUb />

        <Modal ModalTitle="Ub" modalId="ub-modal">
          <FormUb modalid="#ub-modal" />
        </Modal>
      </div>
    </UbContextProvider>
  );
};

export default Ub;
