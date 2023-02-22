import { useContext } from "react";
import { SelectsContext } from "contexts/SelectsContext";
import { VscDiffAdded } from "react-icons/vsc";
import Label from "../Forms/Label";
import { Modal } from "components";

const Select = (props) => {
  const { styleSetect, styleErrorSelect } = useContext(SelectsContext);
  const styleadd =
    "form-control block w-full px-3 py-1.5 rounded-l-lg border-t-1 border-l-1 border-b-1 border-solid border-gray-300 text-gray-600 pl-1";
  return (
    <>
      <Label>
        {props.label} {props.required ? <b className="text-red-500"> * </b> : ""}
      </Label>
      <div className="flex">
        <div className="grow">
          <select
            className={`${props.add ? styleadd : styleSetect} ${props.error ? "border border-red-500" : ""}`}
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            aria-label={`Select ${props.label}`}
            required={props.required}
            readOnly={props.readOnly ? props.readOnly : false}
            disabled={props.readOnly ? props.readOnly : false}>
            <option defaultValue="00" key="00">
              Seleccione un(a) {props.label}
            </option>
            {props.list?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </div>
        {props.add ? (
          <div className="grow-0 items-center">
            <button
              type="button"
              data-te-toggle="modal"
              data-te-ripple-init
              data-te-target="#-modal"
              className="font-bold px-1 py-2.5 rounded-r-lg border-gray-300 border-t-1 border-r-1 border-b-1 text-gray-600">
              <VscDiffAdded />
            </button>
            <Modal ModalTitle="agregar" modalId="-modal">
              {props.add}
            </Modal>
          </div>
        ) : null}
      </div>

      {props.error ? <span className={styleErrorSelect}>{props.error}</span> : null}
    </>
  );
};

export default Select;
