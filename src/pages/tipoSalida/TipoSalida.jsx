import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoSalidaContextProvider } from "./context/TipoSalidaContext";

import FormTipoSalida from "./components/FormTipoSalida";
import TablaTipoSalida from "./components/TablaTipoSalida";


const TipoSalida = () => {
  const { currentColor } = useStateContext();
  return (
    <TipoSalidaContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo salida">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#tiposalida-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            {" "}
            Nuevo Tipo Salida 
          </button>
        </Header>

        <TablaTipoSalida />

        <Modal ModalTitle="tiposalida" modalId="tiposalida-modal">
          <FormTipoSalida />
        </Modal>
      </div>
    </TipoSalidaContextProvider>
  )
}

export default TipoSalida