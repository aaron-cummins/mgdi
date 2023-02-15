import React, { createContext, useReducer, useState } from "react";
import { OBTENER, OBTENER_MENU, OBTENER_ACCIONES } from "const/actionTypes";
import loginReducer from "reducer/loginReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { getByID } from "services/genericService";
import { PermisosUsuario } from "utilities/Login_utiles";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const [mensajeErr, setMensajeErr] = useState(null);
  const [mensajeOk, setMensajeOk] = useState(null);
  const [logeado, setLogeado] = useState(false);
  //const [permisos, setPermisos] = useState(null);

  const initialState = {
    usuarioLogeado: null,
    menuUsuario: [],
    paginas: [],
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);

  const crearUsuario = async (usuario) => {
    try {
      dispatch({
        type: OBTENER,
        payload: usuario,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setMenuUsuario = async (id_lugar_trabajo) => {
    try {
      let permisos = [];
      let vistas = [];

      let lugares_trabajo = JSON.parse(sessionStorage.getItem("user_info_lugaresTrabajo"));
      let modulos = lugares_trabajo.LugarTrabajo;

      modulos.forEach((item) => {
        if (parseInt(item.lugar_trabajo_id) === parseInt(id_lugar_trabajo)) {
          vistas.push(item.vistas);
        }
      });

      vistas = vistas.flat(3);

      const vta = [];
      let m = [];
      vistas.forEach((item) => {
        if (!m.includes(item.moduloId)) {
          m.push(item.moduloId);
          vta.push(item);
        }
      });

      permisos = PermisosUsuario(vta);

      dispatch({
        type: OBTENER_MENU,
        payload: permisos,
      });

      let grupo = permisos.map((item) => item.grupo).filter((element) => element !== undefined && element !== null);

      let vistas_v2 = grupo?.map((item) => {
        return item?.map((grupo) => grupo.vistas);
      });
      let vistas_ = vistas_v2.flat(2);
      let acciones = vistas_.map((item) => item.accion);

      dispatch({
        type: OBTENER_ACCIONES,
        payload: acciones,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER UNA MODULOS */
  const obtenerModulos = async (id_modulo) => {
    try {
      let modulosEncontrada = null;
      if (id_modulo !== null) {
        const resultado = await callEndpoint(getByID("modulos", id_modulo));
        if (resultado && resultado.data) {
          modulosEncontrada = resultado.data;
        }
      }
      return modulosEncontrada;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        usuarioLogeado: state.usuarioLogeado,
        menuUsuario: state.menuUsuario,
        paginas: state.paginas,

        setMenuUsuario,

        logeado,
        setLogeado,

        crearUsuario,
        obtenerModulos,
        mensajeErr,
        setMensajeErr,
        mensajeOk,
        setMensajeOk,
      }}>
      {props.children}
    </LoginContext.Provider>
  );
};
