import React, { useContext, useEffect, useState } from "react";
import { useStateContext } from "contexts/ContextProvider";
import { LoginContext } from "contexts/LoginContext";
import { Link } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { getUsuarioLugarTrabajo } from "utilities/Login_utiles";
import { iconModulo } from "data/iconos";
import Menu from "./Menu";

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const MenuInit = [
  {
    id: 0,
    nombre: "Inicio",
    controller: "inicio",
    accion: "inicio",
    icono: 0,
  },
];

const Sidebar2 = () => {
  const [menu, setMenu] = useState(MenuInit);
  const { activeMenu, setActiveMenu, setIsClicked } = useStateContext();
  const { menuUsuario, setMenuUsuario } = useContext(LoginContext);

  const handleActiveMenu = (e, controlador) => {
    e.preventDefault();

    //oculto todos los menus
    let submenus = document.querySelectorAll('[name="submenu"]');
    submenus.forEach(function (item) {
      item.classList.remove("flex");
      item.classList.add("hidden");
    });

    //muestro solo el que se solicita
    let menu = document.querySelector(`#control-${controlador}`);
    menu.classList.remove("hidden");
    menu.classList.add("flex");

    //si el menu esta oculto lo muestro
    if (!activeMenu) {
      setActiveMenu(true);
    }
  };

  const handleMenubar = (e, id) => {
    e.preventDefault();

    let menubars = document.querySelectorAll('[name="menubars"]');
    menubars.forEach(function (item) {
      item.classList.remove("border-l-4");
      item.classList.remove("border-l-red-800");
    });

    let menubar = document.querySelector(`#hover-${id}`);
    menubar.classList.add("border-l-4");
    menubar.classList.add("border-l-red-800");
  };

  const handleCloseSideBar = () => {
    setActiveMenu(false);
    setIsClicked(initialState);
  };

  const iconos = (id) => iconModulo[id].icono;

  useEffect(() => {
    let l_t = getUsuarioLugarTrabajo();
    setMenuUsuario(l_t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMenu(menuUsuario);
  }, [menuUsuario]);

  return (
    <div className="fixed h-screen overflow-auto md:hover:overflow-auto flex flex-row bg-secondary-dark-bg">
      <div
        className={`flex flex-col justify-between items-center flex-none bg-secondary-dark-bg text-white ${
          activeMenu ? "w-16" : "w-0 md:w-16"
        } `}>
        <div className="flex flex-col space-y-4 w-full items-center pt-5">
          {/* MODULOS */}
          {menu?.map((item) => (
            <div
              key={`hover-${item.id}`}
              id={`hover-${item.id}`}
              name="menubars"
              className="w-12 hover:border-l-4 hover:border-l-gray-500"
              onClick={(e) => handleMenubar(e, item.id)}>
              <TooltipComponent key={`tooltip-${item.controller}`} content={item.nombre} position="RightCenter">
                <Link
                  key={item.id}
                  to={item.accion ? item.accion : "#"}
                  onClick={(e) => {
                    item.grupo ? handleActiveMenu(e, item.controller) : handleCloseSideBar();
                  }}
                  className="relative w-full h-12 flex flex-col justify-center items-center">
                  <div className=" flex rounded-full w-8 h-8 text-3xl">{iconos(item.icono ? item.icono : 0)}</div>
                  <p className="flex text-center text-[0.6rem]">
                    {item.nombre.length > 8 ? `${item.nombre.slice(0, 8)}.` : item.nombre}
                  </p>
                </Link>
              </TooltipComponent>
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-4 pb-5">
          {/*<a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>*/}
        </div>
      </div>

      <div className={`${activeMenu ? "flex" : "hidden"} w-64 flex-none overflow-auto bg-gray-cummins p-2 flex-col`}>
        {menu?.map(
          (item) =>
            item.grupo && (
              <Menu
                key={`submenu-${item.controller}`}
                controller={item.controller}
                nombremodulo={item.nombre}
                grupo={item.grupo}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Sidebar2;
