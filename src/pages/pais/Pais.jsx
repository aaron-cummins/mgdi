import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { PaisContextProvider } from "./context/paisContext";

import FormPais from "./components/FormPais";
import TablaPais from "./components/TablaPais";

const Pais = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <PaisContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="País">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#pais-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo País
          </button>
        </Header>

        <TablaPais openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="País" modalId="pais-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormPais closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </PaisContextProvider>
  );
};

export default Pais;
