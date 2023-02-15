const Checkbox = ({ name, id, onChangeFN, checked, label }) => {
  return (
    <>
      <br />
      <input
        className="form-check-input appearance-none h-4 w-1 px-3 py-1.5 pl-1 border border-gray-300 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="checkbox"
        id={id}
        name={name}
        onChange={onChangeFN}
        checked={checked}
      />
      {label && <label className="form-check-label inline-block text-gray-800">{label}</label>}
    </>
  );
};

export default Checkbox;
