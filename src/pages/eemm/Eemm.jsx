import React from "react";
import { Outlet } from "react-router-dom";
import { EemmContextProvider } from "./context/eemmContext";

const Eemm = () => {
  return (
    <EemmContextProvider>
      <div className="m-1 p-7 rounded-3xl">
        <Outlet />
      </div>
    </EemmContextProvider>
  );
};

export default Eemm;
