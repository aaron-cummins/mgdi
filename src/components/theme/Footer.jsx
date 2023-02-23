import React from "react";
import { getUsuarioLugarTrabajoName } from "utilities/Login_utiles";

const Footer = () => (
  <footer className="mt-1">
    <p className="dark:text-gray-200 text-gray-700 text-center m-2">
      <span className="text-gray-600 ml-1 text-xs">Lugar de trabajo seleccionado</span>
      <span className="text-gray-500 font-bold ml-1 text-xs">{getUsuarioLugarTrabajoName()}</span>
    </p>
    <p className="dark:text-gray-200 text-gray-700 text-center m-2 text-sm">© 2022 Distribuidora Cummins Chile</p>
  </footer>
);

export default Footer;
