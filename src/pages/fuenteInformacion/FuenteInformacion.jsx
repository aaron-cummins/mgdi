import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { FuenteInformacionContextProvider } from "./context/FuenteInformacionContext";

import FormFuenteInformacion from "./components/FormFuenteInformacion";
import TablaFuenteInformacion from "./components/TablaFuenteInformacion";

const FuenteInformacion = () => {
  const { currentColor } = useStateContext();
  return (
    <FuenteInformacionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Fuente de información">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#fuenteinformacion-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Fuente Información
          </button>
        </Header>

        <TablaFuenteInformacion />

        <Modal ModalTitle="Fuente Informacion" modalId="fuenteinformacion-modal">
          <FormFuenteInformacion />
        </Modal>
      </div>
    </FuenteInformacionContextProvider>
  );
};

export default FuenteInformacion;
