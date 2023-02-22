import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ZonaContextProvider } from "./context/zonaContext";

import FormZona from "./components/FormZona";
import TablaZona from "./components/TablaZona";

const Zona = () => {
  const { currentColor } = useStateContext();
  return (
    <ZonaContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Zona">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#zona-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Zona
          </button>
        </Header>

        <TablaZona />

        <Modal ModalTitle="Zona" modalId="zona-modal">
          <FormZona />
        </Modal>
      </div>
    </ZonaContextProvider>
  );
};

export default Zona;
