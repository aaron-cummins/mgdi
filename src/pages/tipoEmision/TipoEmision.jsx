import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoEmisionContextProvider } from "./context/tipoemisionContext";

import FormTipoEmision from "./components/FormTipoEmision";
import TablaTipoEmision from "./components/TablaTipoEmision";

const TipoEmision = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <TipoEmisionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Emisión">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tipoemision-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Emisión
          </button>
        </Header>

        <TablaTipoEmision openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Tipo Emisión"
          modalId="tipoemision-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormTipoEmision modalid="#tipoemision-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </TipoEmisionContextProvider>
  );
};

export default TipoEmision;
