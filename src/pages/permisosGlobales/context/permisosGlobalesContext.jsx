import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject, deleteAllObject } from "services/genericService";
import permisosGlobalesReducer from "../reducer/permisosGlobalesReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const PermisosGlobalesContext = createContext();

export const PermisosGlobalesContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "permisosglobales";

  const initialState = {
    permisoGlobalList: [],
    permisoGlobalActual: null,
  };

  const [state, dispatch] = useReducer(permisosGlobalesReducer, initialState);

  /* OBETENER LISTADO DE permisoGlobalS */
  const obtenerPermisosGlobales = async () => {
    try {
      const resultado = await callEndpoint(getList(urlApi));
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

  /* OBTENER UNA permisoGlobal */
  const obtenerPermisoGlobal = async (permisoGlobal) => {
    try {
      let permisoGlobalEncontrada = null;
      if (permisoGlobal !== null) {
        const resultado = await callEndpoint(getByID(urlApi, permisoGlobal.id));
        if (resultado && resultado.data) {
          permisoGlobalEncontrada = resultado.data;
        }
      } else {
        permisoGlobalEncontrada = permisoGlobal;
      }

      dispatch({
        type: OBTENER,
        payload: permisoGlobalEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR permisoGlobal */
  const registrarPermisoGlobal = async (permisoGlobal) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, permisoGlobal));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "permiso global creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar crear el permiso global. ${error}` })
      );
    }
  };

  /* REGISTRAR permisoGlobal listado */
  const registrarPermisoGlobalList = async (permisoGloballist) => {
    try {
      let rsltdo = [];
      console.log(permisoGloballist);

      await eliminarPermisoGlobalesAll();

      for (const permi of permisoGloballist) {
        const resultado = await callEndpoint(postObject(urlApi, permi));
        rsltdo.push(resultado.data);
      }

      dispatch({
        type: REGISTRAR,
        payload: rsltdo,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "permiso global creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar crear el permiso global. ${error}` })
      );
    }
  };

  /* ACTUALIZAR permisoGlobal */
  const actualizarPermisoGlobal = async (permisoGlobal) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, permisoGlobal));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "permiso global actualizado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar actualizar el permiso global. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR permisoGlobal */
  const eliminarPermisoGlobal = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "permiso global eliminado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar eliminar el permiso global. ${error}` })
      );
    }
  };

  const eliminarPermisoGlobalesAll = async () => {
    try {
      await callEndpoint(deleteAllObject(`${urlApi}/delall`));
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "permisoGlobal eliminados con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar eliminar los permisos globales. ${error}`,
        })
      );
    }
  };

  return (
    <PermisosGlobalesContext.Provider
      value={{
        permisoGlobalList: state.permisoGlobalList,
        permisoGlobalActual: state.permisoGlobalActual,

        obtenerPermisosGlobales,
        obtenerPermisoGlobal,
        registrarPermisoGlobal,
        actualizarPermisoGlobal,
        eliminarPermisoGlobal,
        registrarPermisoGlobalList,
      }}>
      {props.children}
    </PermisosGlobalesContext.Provider>
  );
};
