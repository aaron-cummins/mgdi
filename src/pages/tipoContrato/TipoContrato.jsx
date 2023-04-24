import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoContratoContextProvider } from "./context/TipoContratoContext";

import FormTipoContrato from "./components/FormTipoContrato";
import TablaTipoContrato from "./components/TablaTipoContrato";

const TipoContrato = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <TipoContratoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Contrato">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tipocontrato-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Contrato
          </button>
        </Header>

        <TablaTipoContrato openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Tipo Contrato"
          modalId="tipocontrato-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormTipoContrato closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </TipoContratoContextProvider>
  );
};

export default TipoContrato;
