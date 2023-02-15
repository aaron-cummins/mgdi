import React from "react";
import img from "assets/img/engine-icon.png";

const Spinner = () => {
  return (
    <img
      width="50px"
      height="50px"
      alt="..."
      src={img}
      className="animate-spin-medium"
    />
  );
};

export default Spinner;
