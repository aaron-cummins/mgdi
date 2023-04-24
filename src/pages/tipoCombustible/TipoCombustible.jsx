import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoCombustibleContextProvider } from "./context/tipocombustibleContext";

import FormTipoCombustible from "./components/FormTipoCombustible";
import TablaTipoCombustible from "./components/TablaTipoCombustible";

const TipoCombustible = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <TipoCombustibleContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Combustible">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tipocombustible-modal"
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

        <TablaTipoCombustible openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Tipo Admisión"
          modalId="tipocombustible-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormTipoCombustible modalid="#tipocombustible-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </TipoCombustibleContextProvider>
  );
};

export default TipoCombustible;
