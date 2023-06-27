import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { VersionEquipoContextProvider } from "./context/versionEquipoContext";

import FormVersionEquipo from "./components/FormVersionEquipo";
import TablaVersionEquipo from "./components/TablaVersionEquipo";

const VersionEquipo = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <VersionEquipoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Versión Equipo">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#versionequipo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Versión Equipo
          </button>
        </Header>

        <TablaVersionEquipo openModal={() => setOpenModal(true)} />

        <Modal
          ModalTitle="Versión Equipo"
          modalId="versionequipo-modal"
          open={openModal}
          onClose={() => setOpenModal(false)}>
          <FormVersionEquipo closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </VersionEquipoContextProvider>
  );
};

export default VersionEquipo;
