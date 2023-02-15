import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { PostTratamientoContextProvider } from "./context/PostTratamientoContext";

import FormPostTratamiento from "./components/FormPostTratamiento";
import TablaPostTratamiento from "./components/TablaPostTratamiento";

const PostTratamiento = () => {
  const { currentColor } = useStateContext();
  return (
    <PostTratamientoContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Post tratamiento">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#posttratamiento-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Post Tratamiento
          </button>
        </Header>

        <TablaPostTratamiento />

        <Modal ModalTitle="Post Tratamiento" modalId="posttratamiento-modal">
          <FormPostTratamiento />
        </Modal>
      </div>
    </PostTratamientoContextProvider>
  );
};

export default PostTratamiento;
