import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoContratoContextProvider } from "./context/TipoContratoContext";

import FormTipoContrato from "./components/FormTipoContrato";
import TablaTipoContrato from "./components/TablaTipoContrato";

const TipoContrato = () => {
  const { currentColor } = useStateContext();
  return (
    <TipoContratoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Contrato">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#tipocontrato-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Contrato
          </button>
        </Header>

        <TablaTipoContrato />

        <Modal ModalTitle="Tipo Contrato" modalId="tipocontrato-modal">
          <FormTipoContrato />
        </Modal>
      </div>
    </TipoContratoContextProvider>
  );
};

export default TipoContrato;
