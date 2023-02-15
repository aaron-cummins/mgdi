import React from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const Alerts = (props) => {
  switch (props.type) {
    case "danger":
      return (
        <div
          className="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full"
          role="alert">
          <GiCancel className="text-2xl w-4 h-4 mr-2 fill-current" />
          {props.children}
        </div>
      );

    case "success":
      return (
        <div
          className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
          role="alert">
          <FaCheckCircle className="text-2xl w-4 h-4 mr-2 fill-current" />
          {props.children}
        </div>
      );

    case "warning":
      return (
        <div
          className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full"
          role="alert">
          <TbAlertTriangle className="text-2xl w-4 h-4 mr-2 fill-current" />
          {props.children}
        </div>
      );

    default:
      return (
        <div
          className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full"
          role="alert">
          <TbAlertTriangle className="text-2xl w-4 h-4 mr-2 fill-current" />
          No se reconocio nungun tipo de alerta.
        </div>
      );
  }
};

export default Alerts;
