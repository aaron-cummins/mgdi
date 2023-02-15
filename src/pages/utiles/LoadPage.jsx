import React from "react";
import "assets/css/error_page.css";
import img from "assets/img/img.png";

const LoadPage = () => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div className="fixed inset-0 bg-main-dark-bg bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <h1 className="text-center text-white"> Cargando ... </h1>
        <div className="flex items-center justify-center h-full text-center p-0">
          <img alt="..." src={img} className="animate-spin-slow" />
        </div>
      </div>
    </div>
  );
};
export default LoadPage;
