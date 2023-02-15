import React, { createContext, useReducer } from "react";
import {
  OBTENER,
  OBTENER_LISTA,
  REGISTRAR,
  ACTUALIZAR,
  ELIMINAR,
  REGISTRAR_OTRO,
  ELIMINAR_OTRO,
  OBTENER_LISTA_OTROS,
} from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import usuarioReducer from "../reducer/usuarioReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const UsuarioContext = createContext();

export const UsuarioContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "usuarios";

  const initialState = {
    usuarioList: [],
    usuarioActual: null,
    usuarioPermisosList: [],
  };

  const [state, dispatch] = useReducer(usuarioReducer, initialState);

  /* OBETENER LISTADO DE USUARIOS */
  const obtenerUsuariolist = async () => {
    try {
      const resultado = await callEndpoint(getList(`${urlApi}/cargo`));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER UNA USUARIO */
  const obtenerUsuario = async (usuario) => {
    try {
      let usuarioEncontrada = null;
      if (usuario !== null) {
        const resultado = await callEndpoint(getByID(`${urlApi}/cargo`, usuario.id));
        if (resultado && resultado.data) {
          usuarioEncontrada = resultado.data;
        }
      } else {
        usuarioEncontrada = usuario;
      }

      dispatch({
        type: OBTENER,
        payload: usuarioEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR USUARIO */
  const registrarUsuario = async (usuario) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, usuario));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Usuario creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Usuario. ${error}`);
    }
  };

  /* ACTUALIZAR USUARIO */
  const actualizarUsuario = async (usuario) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, usuario));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Usuario actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Usuario. ${error}`);
    }
  };

  /* ELIMINAR USUARIO */
  const eliminarUsuario = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Usuario eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Usuario. ${error}`);
    }
  };

  /* REGISTRAR PERMISOS USUARIO */
  const registrarPermisosUsuario = async (permisos) => {
    try {
      for (const permi of permisos) {
        const resultado = await callEndpoint(postObject("permisosusuario", permi));
        dispatch({
          type: REGISTRAR_OTRO,
          payload: resultado.data,
        });
      }

      alerta("success", "Permisos de usuario asignados con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar asignar los permisos al usuario. ${error}`);
    }
  };

  /* ELIMINAR PERMISOS USUARIO */
  const eliminarPermisosUsuario = async (id_usuario) => {
    try {
      await callEndpoint(deleteObject("permisosusuario/delusuario", id_usuario));
      dispatch({
        type: ELIMINAR_OTRO,
        payload: id_usuario,
      });
      //alerta("success", "Usuario eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar los permisos al usuario. ${error}`);
    }
  };

  const obtenerPermisosUsuariolist = async (id_usuario) => {
    try {
      let permisos = null;

      if (id_usuario !== null) {
        const resultado = await callEndpoint(getByID("permisosusuario/usuario", id_usuario));
        permisos = resultado.data;
      }

      dispatch({
        type: OBTENER_LISTA_OTROS,
        payload: permisos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarioList: state.usuarioList,
        usuarioActual: state.usuarioActual,
        usuarioPermisosList: state.usuarioPermisosList,

        obtenerUsuariolist,
        obtenerUsuario,
        registrarUsuario,
        actualizarUsuario,
        eliminarUsuario,

        obtenerPermisosUsuariolist,
        registrarPermisosUsuario,
        eliminarPermisosUsuario,
      }}>
      {props.children}
    </UsuarioContext.Provider>
  );
};
