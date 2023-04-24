import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipolugartrabajoContextProvider } from "./context/tipolugartrabajoContext";

import FormTipoLugarTrabajo from "./components/FormTipoLugarTrabajo";
import TablaTipolugarTrabajo from "./components/TablaTipoLugartrabajo";

const TipoLugarTrabajo = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <TipolugartrabajoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo lugar de trabajo">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tipolugartrabajo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo lugar de trabajo
          </button>
        </Header>

        <TablaTipolugarTrabajo openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Tipo lugar de trabajo"
          modalId="tipolugartrabajo-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormTipoLugarTrabajo modalid="#tipolugartrabajo-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </TipolugartrabajoContextProvider>
  );
};

export default TipoLugarTrabajo;
