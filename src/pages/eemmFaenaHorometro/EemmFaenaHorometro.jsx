import React from "react";
import { Outlet } from "react-router-dom";
import { EemmFaenaHorometroContextProvider } from "./context/eemmFaenaHorometroContext";

const EemmFaenaHorometro = () => {
  return (
    <EemmFaenaHorometroContextProvider>
      <div className="m-1 p-7 rounded-3xl">
        <Outlet />
      </div>
    </EemmFaenaHorometroContextProvider>
  );
};

export default EemmFaenaHorometro;
