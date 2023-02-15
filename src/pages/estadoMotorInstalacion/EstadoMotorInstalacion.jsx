import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EstadoMotorInstalacionContextProvider } from "./context/EstadoMotorInstalacionContext";

import FormEstadoMotorInstalacion from "./components/FormEstadoMotorInstalacion";
import TablaEstadoMotorInstalacion from "./components/TablaEstadoMotorInstalacion";

const EstadoMotorInstalacion = () => {
  const { currentColor } = useStateContext();
  return (
    <EstadoMotorInstalacionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Estado motor instalación">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#estadomotorinstalacion-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Estado Motor Instalación
          </button>
        </Header>

        <TablaEstadoMotorInstalacion />

        <Modal ModalTitle="Estado Motor Instalacion" modalId="estadomotorinstalacion-modal">
          <FormEstadoMotorInstalacion />
        </Modal>
      </div>
    </EstadoMotorInstalacionContextProvider>
  );
};

export default EstadoMotorInstalacion;
