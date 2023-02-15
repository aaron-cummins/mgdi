import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { CargoContextProvider } from "./context/cargoContext";

import FormCargo from "./components/FormCargo";
import TablaCargo from "./components/TablaCargo";

const Cargo = () => {
  const { currentColor } = useStateContext();
  return (
    <CargoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Cargo">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#cargo-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Cargo
          </button>
        </Header>

        <TablaCargo />

        <Modal ModalTitle="Cargo" modalId="cargo-modal">
          <FormCargo />
        </Modal>
      </div>
    </CargoContextProvider>
  );
};

export default Cargo;
