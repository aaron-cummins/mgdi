import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { EquipoContextProvider } from "./context/equipoContext";

import FormEquipo from "./components/FormEquipo";
import TablaEquipos from "./components/TablaEquipos";

const Equipo = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <EquipoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Equipo">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#equipo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Equipo
          </button>
        </Header>

        <TablaEquipos openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Equipo" modalId="equipo-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormEquipo closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </EquipoContextProvider>
  );
};

export default Equipo;
