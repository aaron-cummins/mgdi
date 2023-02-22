import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoFiltradoContextProvider } from "./context/tipofiltradoContext";

import FormTipoFiltrado from "./components/FormTipoFiltrado";
import TablaTipoFiltrado from "./components/TablaTipoFiltrado";

const TipoFiltrado = () => {
  const { currentColor } = useStateContext();
  return (
    <TipoFiltradoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Filtrado">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#tipofiltrado-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Filtrado
          </button>
        </Header>

        <TablaTipoFiltrado />

        <Modal ModalTitle="Tipo Filtrado" modalId="tipofiltrado-modal">
          <FormTipoFiltrado modalid="#tipofiltrado-modal" />
        </Modal>
      </div>
    </TipoFiltradoContextProvider>
  );
};

export default TipoFiltrado;
