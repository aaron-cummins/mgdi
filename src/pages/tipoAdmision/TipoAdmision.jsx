import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoAdmisionContextProvider } from "./context/tipoadmisionContext";

import FormTipoAdmision from "./components/FormTipoAdmision";
import TablaTipoAdmision from "./components/TablaTipoAdmision";

const TipoAdmision = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <TipoAdmisionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Admisión">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tipoadmision-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Admisión
          </button>
        </Header>

        <TablaTipoAdmision openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Tipo Admisión"
          modalId="tipoadmision-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormTipoAdmision modalid="#tipoadmision-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </TipoAdmisionContextProvider>
  );
};

export default TipoAdmision;
