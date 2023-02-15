import React from "react";
import Label from "./Label";

const Switch = (props) => {
  return (
    <>
      <Label>{props.label}</Label>
      <br />
      <label htmlFor={props.id} className="inline-flex items-center rounded-md cursor-pointer text-gray-800">
        <input
          type="checkbox"
          className="hidden peer"
          id={props.id}
          name={props.name}
          checked={props.checked}
          onChange={props.onChange}
          required={props.required}
        />

        <span className="px-4 py-1.5 rounded-l-md bg-green-500 peer-checked:bg-gray-300 text-white peer-checked:text-black">
          No
        </span>
        <span className="px-4 py-1.5 rounded-r-md bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white">
          Si
        </span>
      </label>
    </>
  );
};

export default Switch;
