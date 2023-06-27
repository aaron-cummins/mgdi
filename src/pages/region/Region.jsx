import React, { useState } from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { RegionContextProvider } from "./context/regionContext";

import FormRegion from "./components/FormRegion";
import TablaRegiones from "./components/TablaRegiones";

const Region = () => {
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <RegionContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Región">
          <button
            type="button"
            data-te-toggle="modal"
            data-te-ripple-init
            data-te-target="#region-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setOpenModal(true)}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Región
          </button>
        </Header>

        <TablaRegiones openModal={() => setOpenModal(true)} />

        <Modal ModalTitle="Región" modalId="region-modal" open={openModal} onClose={() => setOpenModal(false)}>
          <FormRegion closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </RegionContextProvider>
  );
};

export default Region;
