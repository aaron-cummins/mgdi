import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = (props) => {
  return (
    <div
      className="modal fade fixed top-10 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id={props.modalId}
      tabIndex="-1"
      aria-labelledby="modal"
      aria-modal="true"
      role="dialog">
      <div
        className={`modal-dialog modal-${
          !props.dimension ? "lg" : props.dimension
        } relative w-auto pointer-events-none`}>
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalXlLabel">
              {props.ModalTitle}
            </h5>
            <button
              type="button"
              id="cerrar_modal_"
              style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray hover:rounded-full hover:text-white"
              data-bs-dismiss="modal"
              aria-label="Close">
              <AiOutlineCloseCircle />
            </button>
          </div>
          <div className="modal-body relative p-4">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
