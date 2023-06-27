import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoInyeccionContextProvider } from "./context/tipoinyeccionContext";

import FormTipoInyeccion from "./components/FormTipoInyeccion";
import TablaTipoInyeccion from "./components/TablaTipoInyeccion";

const TipoInyeccion = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <TipoInyeccionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Inyección">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tipoinyeccion-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Inyección
          </button>
        </Header>

        <TablaTipoInyeccion openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Tipo Inyección" modalId="tipoinyeccion-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormTipoInyeccion modalid="#tipoinyeccion-modal" closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </TipoInyeccionContextProvider>
  );
};

export default TipoInyeccion;
