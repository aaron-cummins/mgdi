import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoSalidaContextProvider } from "./context/TipoSalidaContext";

import FormTipoSalida from "./components/FormTipoSalida";
import TablaTipoSalida from "./components/TablaTipoSalida";

const TipoSalida = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <TipoSalidaContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo salida">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tiposalida-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Salida
          </button>
        </Header>

        <TablaTipoSalida openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Tipo Salida" modalId="tiposalida-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormTipoSalida closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </TipoSalidaContextProvider>
  );
};

export default TipoSalida;
