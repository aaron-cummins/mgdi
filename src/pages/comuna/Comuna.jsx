import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ComunaContextProvider } from "./context/comunaContext";

import FormComuna from "./components/FormComuna";
import TablaComunas from "./components/TablaComunas";

const Comuna = () => {
  const { currentColor } = useStateContext();

  return (
    <ComunaContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Comuna">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#comuna-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Comuna
          </button>
        </Header>

        <TablaComunas />

        <Modal ModalTitle="Comuna" modalId="comuna-modal">
          <FormComuna />
        </Modal>
      </div>
    </ComunaContextProvider>
  );
};

export default Comuna;
