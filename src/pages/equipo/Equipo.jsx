import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EquipoContextProvider } from "./context/equipoContext";

import FormEquipo from "./components/FormEquipo";
import TablaEquipos from "./components/TablaEquipos";

const Equipo = () => {
  const { currentColor } = useStateContext();

  return (
    <EquipoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Equipo">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#equipo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Equipo
          </button>
        </Header>

        <TablaEquipos />

        <Modal ModalTitle="Equipo" modalId="equipo-modal">
          <FormEquipo />
        </Modal>
      </div>
    </EquipoContextProvider>
  );
};

export default Equipo;
