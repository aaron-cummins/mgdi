import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { FlotaContextProvider } from "./context/flotaContext";

import FormFlota from "./components/FormFlota";
import TablaFlotas from "./components/TablaFlotas";

const Flotas = () => {
  const { currentColor } = useStateContext();

  return (
    <FlotaContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Flota">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#flota-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Flota
          </button>
        </Header>

        <TablaFlotas />

        <Modal ModalTitle="Flota" modalId="flota-modal">
          <FormFlota />
        </Modal>
      </div>
    </FlotaContextProvider>
  );
};

export default Flotas;
