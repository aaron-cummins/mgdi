import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = (props) => {
  return (
    <div
      data-te-modal-init
      className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id={props.modalId}
      tabIndex="-1"
      aria-labelledby="ModalLabel"
      aria-hidden="true">
      <div
        data-te-modal-dialog-ref
        className={`pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out 
              min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] ${
                props.dimension === "xl" ? "min-[1200px]:max-w-[1140px]" : "min-[992px]:max-w-[800px]"
              }`}>
        <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="ModalLabel">
              {props.ModalTitle}
            </h5>
            <button
              type="button"
              id="cerrar_modal_"
              //className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              className="relative text-xl rounded-full p-3 dark:text-white hover:bg-light-gray-2"
              data-te-modal-dismiss
              aria-label="Close">
              <AiOutlineCloseCircle />
            </button>
          </div>
          <div className="relative flex-auto p-4" data-te-modal-body-ref>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
