import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EstadoEquipoContextProvider } from "./context/EstadoEquipoContext";

import FormEstadoEquipo from "./components/FormEstadoEquipo";
import TablaEstadoEquipo from "./components/TablaEstadoEquipo";

const EstadoEquipo = () => {
  const { currentColor } = useStateContext();
  return (
    <EstadoEquipoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Estado Equipo">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#estadoequipo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            {" "}
            Nuevo Estado Equipo
          </button>
        </Header>

        <TablaEstadoEquipo />

        <Modal ModalTitle="Estado Equipo" modalId="estadoequipo-modal">
          <FormEstadoEquipo />
        </Modal>
      </div>
    </EstadoEquipoContextProvider>
  )
}

export default EstadoEquipo