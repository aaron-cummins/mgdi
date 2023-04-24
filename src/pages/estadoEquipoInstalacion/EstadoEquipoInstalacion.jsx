import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EstadoEquipoInstalacionContextProvider } from "./context/EstadoEquipoInstalacionContext";

import FormEstadoEquipoInstalacion from "./components/FormEstadoEquipoInstalacion";
import TablaEstadoEquipoInstalacion from "./components/TablaEstadoEquipoInstalacion";

const EstadoEquipoInstalacion = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <EstadoEquipoInstalacionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Estado equipo instalación">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#estadoequipoinstalacion-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Estado Equipo Instalación
          </button>
        </Header>

        <TablaEstadoEquipoInstalacion openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Estado Equipo Instalacion"
          modalId="estadoequipoinstalacion-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormEstadoEquipoInstalacion closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </EstadoEquipoInstalacionContextProvider>
  );
};

export default EstadoEquipoInstalacion;
