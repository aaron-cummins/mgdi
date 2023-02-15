import React from "react";
import { MdOutlineCancel } from "react-icons/md";
//import { BsCheck } from 'react-icons/bs';

//import { themeColors } from '../data/dummy';
import { useStateContext } from "contexts/ContextProvider";
import { LoginContext } from "contexts/LoginContext";
import { setUsuarioLugarTrabajo } from "utilities/Login_utiles";
import { Select } from "../";
import { useContext } from "react";
import { getUsuarioLugarTrabajo } from "utilities/Login_utiles";
import { useEffect } from "react";
import { useState } from "react";
import { SelectsContext } from "contexts/SelectsContext";

const ThemeSettings = () => {
  const { setMode, currentMode, setThemeSettings, setLugarTrabajoSelected } = useStateContext();
  const { setMenuUsuario } = useContext(LoginContext);
  const { lugarTrabajoUsuarioList } = useContext(SelectsContext);
  const handleOnChange = (e) => {
    setUsuarioLugarTrabajo(e.target.value);
    setLugarTrabajoSelected(e.target.value);
    setMenuUsuario(e.target.value);
    SetLugarActual(e.target.value);
  };

  const [lugarActual, SetLugarActual] = useState(1);

  useEffect(() => {
    SetLugarActual(getUsuarioLugarTrabajo);
  }, []);

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Confirguraciones</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray hover:text-white">
            <MdOutlineCancel />
          </button>
        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Faena</p>
          <div className="mt-4">
            <Select
              onChange={handleOnChange}
              value={lugarActual}
              name="lugar_trabajo_global"
              id="lugar_trabajo_global"
              label="Sleccione Lugar de Trabajo"
              list={lugarTrabajoUsuarioList}
            />
          </div>
        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Opciones de Tema</p>
          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Claro
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={setMode}
              className="cursor-pointer"
              checked={currentMode === "Dark"}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Oscuro
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
