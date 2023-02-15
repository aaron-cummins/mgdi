import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { FlotaLugarTrabajoContextProvider } from "./context/flotaLugarTrabajoContext";

import FormFlotaLugarTrabajo from "./components/FormFlotaLugarTrabajo";
import TablaFlotasLugarTrabajo from "./components/TablaFlotasLugarTrabajo";

const FlotaLugarTrabajo = () => {
  const { currentColor } = useStateContext();

  return (
    <FlotaLugarTrabajoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Flota - Lugar de Trabajo">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#flotalugartrabajo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Asignar Flota a Lugar de Trabajo
          </button>
        </Header>

        <TablaFlotasLugarTrabajo />

        <Modal ModalTitle="Flota - Lugar de Trabajo" modalId="flotalugartrabajo-modal">
          <FormFlotaLugarTrabajo />
        </Modal>
      </div>
    </FlotaLugarTrabajoContextProvider>
  );
};

export default FlotaLugarTrabajo;
