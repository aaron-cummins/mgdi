import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { ModulosContextProvider } from "./context/modulosContext";

import FormModulos from "./components/FormModulos";
import TablaModulos from "./components/TablaModulos";

const Modulos = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <ModulosContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Módulos">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#modulos-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Módulo
          </button>
        </Header>

        <TablaModulos openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Módulo control" modalId="modulos-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormModulos closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </ModulosContextProvider>
  );
};

export default Modulos;
