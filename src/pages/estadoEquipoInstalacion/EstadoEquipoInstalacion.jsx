import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EstadoEquipoInstalacionContextProvider } from "./context/EstadoEquipoInstalacionContext";

import FormEstadoEquipoInstalacion from "./components/FormEstadoEquipoInstalacion";
import TablaEstadoEquipoInstalacion from "./components/TablaEstadoEquipoInstalacion";

const EstadoEquipoInstalacion = () => {
  const { currentColor } = useStateContext();
  return (
    <EstadoEquipoInstalacionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Estado equipo instalación">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#estadoequipoinstalacion-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Estado Equipo Instalación
          </button>
        </Header>

        <TablaEstadoEquipoInstalacion />

        <Modal ModalTitle="Estado Equipo Instalacion" modalId="estadoequipoinstalacion-modal">
          <FormEstadoEquipoInstalacion />
        </Modal>
      </div>
    </EstadoEquipoInstalacionContextProvider>
  );
};

export default EstadoEquipoInstalacion;
