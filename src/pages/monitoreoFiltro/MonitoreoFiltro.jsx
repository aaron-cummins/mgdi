import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { MonitoreoFiltroContextProvider } from "./context/monitoreoFiltroContext";

import FormMonitoreoFiltro from "./components/FormMonitoreoFiltro";
import TablaMonitoreoFiltro from "./components/TablaMonitoreoFiltro";

const MonitoreoFiltro = () => {
  const { currentColor } = useStateContext();
  return (
    <MonitoreoFiltroContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Monitoreo Filtro">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#monitoreofiltro-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Monitoreo Filtro
          </button>
        </Header>

        <TablaMonitoreoFiltro />

        <Modal ModalTitle="Monitoreo Filtro" modalId="monitoreofiltro-modal">
          <FormMonitoreoFiltro modalid="#monitoreofiltro-modal" />
        </Modal>
      </div>
    </MonitoreoFiltroContextProvider>
  );
};

export default MonitoreoFiltro;
