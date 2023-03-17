/* LABEL FORM */
const Label = (props) => {
  return (
    <label htmlFor={props.htmlFor} className="text-gray-700">
      {props.children}
    </label>
  );
};

export default Label;
