import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { AplicacionContextProvider } from "./context/aplicacionContext";

import FormAplicacion from "./components/FormAplicacion";
import TablaAplicacion from "./components/TablaAplicacion";

const Aplicacion = () => {
  const { currentColor } = useStateContext();
  return (
    <AplicacionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Aplicación">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#aplicacion-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Aplicacion
          </button>
        </Header>

        <TablaAplicacion />

        <Modal ModalTitle="Aplicación" modalId="aplicacion-modal">
          <FormAplicacion modalid="#aplicacion-modal" />
        </Modal>
      </div>
    </AplicacionContextProvider>
  );
};

export default Aplicacion;
