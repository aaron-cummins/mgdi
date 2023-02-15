import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoAdmisionContextProvider } from "./context/tipoadmisionContext";

import FormTipoAdmision from "./components/FormTipoAdmision";
import TablaTipoAdmision from "./components/TablaTipoAdmision";

const TipoAdmision = () => {
  const { currentColor } = useStateContext();
  return (
    <TipoAdmisionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Admisión">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#tipoadmision-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Admisión
          </button>
        </Header>

        <TablaTipoAdmision />

        <Modal ModalTitle="Tipo Admisión" modalId="tipoadmision-modal">
          <FormTipoAdmision modalid="#tipoadmision-modal" />
        </Modal>
      </div>
    </TipoAdmisionContextProvider>
  );
};

export default TipoAdmision;
