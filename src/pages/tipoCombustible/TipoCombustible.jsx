import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { TipoCombustibleContextProvider } from "./context/tipocombustibleContext";

import FormTipoCombustible from "./components/FormTipoCombustible";
import TablaTipoCombustible from "./components/TablaTipoCombustible";

const TipoCombustible = () => {
  const { currentColor } = useStateContext();
  return (
    <TipoCombustibleContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Tipo Combustible">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#tipocombustible-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Tipo Admisión
          </button>
        </Header>

        <TablaTipoCombustible />

        <Modal ModalTitle="Tipo Admisión" modalId="tipocombustible-modal">
          <FormTipoCombustible modalid="#tipocombustible-modal" />
        </Modal>
      </div>
    </TipoCombustibleContextProvider>
  );
};

export default TipoCombustible;
