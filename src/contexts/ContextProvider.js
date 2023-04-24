import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const initialAlertMensaje = {
  mensaje: null,
  tipoAlerta: null,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#D02323");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);

  const [activeMenu, setActiveMenu] = useState(false);
  const [activeMenubar, setActiveMenubar] = useState("");

  const [isClicked, setIsClicked] = useState(initialState);

  const [lugarTrabajoSelected, setLugarTrabajoSelected] = useState(0);

  const [cargando, setCargando] = useState(false);

  const [mensaje, SetMensaje] = useState(initialAlertMensaje);

  const [openModal, setOpenModal] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
    setIsClicked(initialState);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
    setIsClicked(initialState);
  };

  /* Muestra alerta y la destruye a los 5 segundos */
  const alerta = (tipoAlerta, mensaje) => {
    SetMensaje({
      mensaje: mensaje,
      tipoAlerta: tipoAlerta,
    });

    setTimeout(() => {
      SetMensaje({
        mensaje: null,
        tipoAlerta: null,
      });
    }, 2000);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        activeMenubar,
        setActiveMenubar,
        lugarTrabajoSelected,
        setLugarTrabajoSelected,
        alerta,
        mensaje,
        cargando,
        setCargando,

        openModal,
        setOpenModal,
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
