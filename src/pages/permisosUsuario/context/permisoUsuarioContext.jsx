import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import permisoUsuarioReducer from "../reducer/permisoUsuarioReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const PermisoUsuarioContext = createContext();

export const PermisoUsuarioContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "permisousuario";

  const initialState = {
    permisoGlobalList: [],
    permisoGlobalActual: null,
  };

  const [state, dispatch] = useReducer(permisoUsuarioReducer, initialState);

  /* OBETENER LISTADO DE permisoGlobalS */
  const obtenerPermisoUsuario = async () => {
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
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "permisoGlobal creado con exito!" }));
    } catch (error) {
      console.log(error);
      alerta("danger", `'Ocurrió un error al intentar crear el permisoGlobal. ${error}`}));
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
        resolve({ tipoAlerta: "success", mensaje: "permisoGlobal actualizado con exito!" })
      );
    } catch (error) {
      console.log(error);
      alerta("danger", `'Ocurrió un error al intentar actualizar el permisoGlobal. ${error}`}));
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
        resolve({ tipoAlerta: "success", mensaje: "permisoGlobal eliminado con exito!" })
      );
    } catch (error) {
      console.log(error);
      alerta("danger", `'Ocurrió un error al intentar eliminar el permisoGlobal. ${error}`}));
    }
  };

  return (
    <PermisoUsuarioContext.Provider
      value={{
        permisoGlobalList: state.permisoGlobalList,
        permisoGlobalActual: state.permisoGlobalActual,

        obtenerPermisoUsuario,
        obtenerPermisoGlobal,
        registrarPermisoGlobal,
        actualizarPermisoGlobal,
        eliminarPermisoGlobal,
      }}>
      {props.children}
    </PermisoUsuarioContext.Provider>
  );
};
