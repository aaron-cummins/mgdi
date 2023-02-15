import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { RegionContextProvider } from "./context/regionContext";

import FormRegion from "./components/FormRegion";
import TablaRegiones from "./components/TablaRegiones";

const Region = () => {
  const { currentColor } = useStateContext();

  return (
    <RegionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Región">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#region-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Región
          </button>
        </Header>

        <TablaRegiones />

        <Modal ModalTitle="Region" modalId="region-modal">
          <FormRegion />
        </Modal>
      </div>
    </RegionContextProvider>
  );
};

export default Region;
