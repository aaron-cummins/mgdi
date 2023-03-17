import Label from "./Label";

/* INPUT FORM */
const InputText = ({ id, name, placeholder, value, onChangeFN, required, label, type, error, readOnly = false }) => {
  //const classStyle =
  //   "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
  const classStyle =
    "form-control block w-full px-3 py-1.5 border border-solid rounded border-gray-300 text-gray-600 pl-1";
  return (
    <>
      <Label htmlFor={id} className="text-sm text-gray-600">
        {label} {required ? <b className="text-red-500"> * </b> : ""}
      </Label>
      <input
        type={type ? type : "text"}
        className={`${classStyle} ${error ? "border border-red-500" : ""}`}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFN}
        required={required}
        onBlur={type === "date" ? null : onChangeFN}
        readOnly={readOnly}
        disabled={readOnly}
      />
      {error ? (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error}</span>
      ) : null}
    </>
  );
};
export default InputText;
