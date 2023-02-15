import React from "react";
import { Outlet } from "react-router-dom";
import { UsuarioContextProvider } from "./context/usuarioContext";

const Usuario = () => {
  return (
    <UsuarioContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Outlet />
      </div>
    </UsuarioContextProvider>
  );
};

export default Usuario;
