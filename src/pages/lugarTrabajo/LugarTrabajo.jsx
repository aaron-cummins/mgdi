import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";

import FormLugarTrabajo from "./components/FormLugarTrabajo";
import { LugarTrabajoContextProvider } from "./contexts/LugarTrabajoContext";
import TablaLugarTrabajo from "./components/TablaLugarTrabajo";

const LugarTrabajo = () => {
  const { currentColor } = useStateContext();
  return (
    <LugarTrabajoContextProvider>
      <div className="m-1 p-3 md:p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Lugar de trabajo">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#lugarTrabajo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo lugar de trabajo
          </button>
        </Header>

        <TablaLugarTrabajo />

        <Modal ModalTitle="Lugar de Trabajo" modalId="lugarTrabajo-modal">
          <FormLugarTrabajo />
        </Modal>
      </div>
    </LugarTrabajoContextProvider>
  );
};

export default LugarTrabajo;
