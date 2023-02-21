import { SelectsContext } from "contexts/SelectsContext";
import React, { useContext } from "react";
import Label from "../Forms/Label";
import Select from "react-select";

const Select_React = (props) => {
  const { styleErrorSelect } = useContext(SelectsContext);
  //const styleadd =
  //  "form-control block w-full px-3 py-1.5 rounded-l-lg border-t-1 border-l-1 border-b-1 border-solid border-gray-300 text-gray-600 pl-1";

  let opciones = [
    {
      target: { value: 0, name: props.name, type: "select-one", label: props.name },
      value: 0,
      label: "Sleccione una opción",
      name: props.name,
    },
  ];

  props.list?.forEach((item) =>
    opciones.push({
      target: { value: item.id, name: props.name, type: "select-one", label: props.name },
      value: item.id,
      label: item.nombre,
      name: props.name,
    })
  );

  return (
    <>
      <Label>
        {props.label} {props.required ? <b className="text-red-500"> * </b> : ""}
      </Label>
      <Select
        //className={`${props.add ? styleadd : styleSetect} ${props.error ? "border border-red-500" : ""}`}
        id={props.id}
        name={props.name}
        //defaultValue={props.value ? opciones.find((item) => item.value === props.value) : 0}
        value={props.value ? opciones.find((item) => item.value === props.value) : 0}
        onChange={props.onChange}
        options={opciones}
        isSearchable={true}
      />
      {props.error ? <span className={styleErrorSelect}>{props.error}</span> : null}
    </>
  );

  /*const [animal, setAnimal] = useState(null);

  const handleChange = (value) => {
    console.log("value:", value);
    setAnimal(value);
  };*/

  //return <Select value={animal} onChange={handleChange} options={opciones} />;
};

export default Select_React;
