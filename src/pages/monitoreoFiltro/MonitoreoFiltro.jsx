import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { MonitoreoFiltroContextProvider } from "./context/monitoreoFiltroContext";

import FormMonitoreoFiltro from "./components/FormMonitoreoFiltro";
import TablaMonitoreoFiltro from "./components/TablaMonitoreoFiltro";

const MonitoreoFiltro = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
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
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Monitoreo Filtro
          </button>
        </Header>

        <TablaMonitoreoFiltro openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Monitoreo Filtro"
          modalId="monitoreofiltro-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormMonitoreoFiltro modalid="#monitoreofiltro-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </MonitoreoFiltroContextProvider>
  );
};

export default MonitoreoFiltro;
