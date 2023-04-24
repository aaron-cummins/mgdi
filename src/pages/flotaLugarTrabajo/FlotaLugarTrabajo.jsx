import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { FlotaLugarTrabajoContextProvider } from "./context/flotaLugarTrabajoContext";

import FormFlotaLugarTrabajo from "./components/FormFlotaLugarTrabajo";
import TablaFlotasLugarTrabajo from "./components/TablaFlotasLugarTrabajo";

const FlotaLugarTrabajo = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <FlotaLugarTrabajoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Flota - Lugar de Trabajo">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#flotalugartrabajo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Asignar Flota a Lugar de Trabajo
          </button>
        </Header>

        <TablaFlotasLugarTrabajo openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Flota - Lugar de Trabajo"
          modalId="flotalugartrabajo-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormFlotaLugarTrabajo closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </FlotaLugarTrabajoContextProvider>
  );
};

export default FlotaLugarTrabajo;
