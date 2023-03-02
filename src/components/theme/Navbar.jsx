import React, { useEffect, useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
//import { FiShoppingCart } from 'react-icons/fi';
//import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import { Cart, Chat, Notification, UserProfile } from "..";
import { useStateContext } from "contexts/ContextProvider";
import { LoginContext } from "contexts/LoginContext";
import { Tooltip } from "@mui/material";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement="bottom" arrow>
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 dark:text-white hover:bg-light-gray-2">
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 dark:text-gray-200"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const { usuarioLogeado } = useContext(LoginContext);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (screenSize <= 960) {
      setActiveMenu(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-1 md:ml-6 md:mr-6 relative">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={"gray"} icon={<AiOutlineMenu />} />

      {/*<div className="flex">
        <p>
          <span className="text-gray-2 ml-1 text-xs">Lugar de trabajo seleccionado</span>
          <span className="text-gray-400 font-bold ml-1 text-xs">Distribuidora cummins</span>
        </p>
  </div>*/}

      <div className="flex">
        {/*<NavButton title="Carrito" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />*/}
        <NavButton
          title="Notificaciones"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={"gray"}
          icon={<RiNotification3Line />}
        />
        <Tooltip title="Perfil" placement="bottom" arrow>
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray-2 rounded-lg"
            onClick={() => handleClick("userProfile")}>
            <img className="rounded-full w-8 h-8" src="img/users/d2.jpg" alt="Perfil" />
            <p>
              <span className="text-gray-400 font-bold ml-1 text-14">{usuarioLogeado?.nombres}</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Tooltip>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
