import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoBlockContextProvider } from "./context/TipoBlockContext";

import FormTipoBlock from "./components/FormTipoBlock";
import TablaTipoBlock from "./components/TablaTipoBlock";

const TipoBlock = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <TipoBlockContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo block">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tipoblock-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Block
          </button>
        </Header>

        <TablaTipoBlock openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Tipo Block" modalId="tipoblock-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormTipoBlock closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </TipoBlockContextProvider>
  );
};

export default TipoBlock;
