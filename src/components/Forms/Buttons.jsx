/* BUTTONS SUBMIT Y CANCEL */
const Buttons = ({ cancelFN, NoModal = false }) => {
  return (
    <>
      {!NoModal ? (
        <button
          type="button"
          onClick={() => cancelFN()}
          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-light-gray hover:bg-light-gray hover:shadow-lg focus:bg-light-gray focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gray active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal"
          data-te-modal-dismiss
          data-te-ripple-init>
          Cancelar
        </button>
      ) : (
        <button
          type="button"
          onClick={() => cancelFN()}
          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-light-gray hover:bg-light-gray hover:shadow-lg focus:bg-light-gray focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gray active:shadow-lg transition duration-150 ease-in-out">
          Cancelar
        </button>
      )}
      <button
        type="submit"
        className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-red-cummins hover:bg-red-cummins hover:shadow-lg focus:bg-red-cummins focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-cummins active:shadow-lg transition duration-150 ease-in-out ml-1">
        Guardar
      </button>
    </>
  );
};

export default Buttons;
