import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
//import { getVersionEquipoList, getVersionEquipo, postVersionEquipo, putVersionEquipo, deleteVersionEquipo } from 'services/versionequipoService';
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import versionEquipoReducer from "../reducer/versionEquipoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

import { useStateContext } from "contexts/ContextProvider";

export const VersionEquipoContext = createContext();

export const VersionEquipoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "versionequipo";

  const initialState = {
    versionequipoList: [],
    versionequipoActual: null,
  };

  const [state, dispatch] = useReducer(versionEquipoReducer, initialState);

  /* OBETENER LISTADO DE VERSIONEQUIPOS */
  const obtenerVersionEquipos = async () => {
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

  /* OBTENER UN VERSIONEQUIPO */
  const obtenerVersionEquipo = async (versionequipo) => {
    try {
      let versionequipoEncontrado = null;
      if (versionequipo !== null) {
        const resultado = await callEndpoint(getByID(urlApi, versionequipo.id));
        if (resultado && resultado.data) {
          versionequipoEncontrado = resultado.data;
        }
      } else {
        versionequipoEncontrado = versionequipo;
      }

      dispatch({
        type: OBTENER,
        payload: versionequipoEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR VERSIONEQUIPO */
  const registrarVersionEquipo = async (versionequipo) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, versionequipo));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Versión equipo creada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear la versión equipo. ${error}`);
    }
  };

  /* ACTUALIZAR VERSIONEQUIPO */
  const actualizarVersionEquipo = async (versionequipo) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, versionequipo));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Versión equipo actualizada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar la versión equipo. ${error}`);
    }
  };

  /* ELIMINAR VERSIONEQUIPO */
  const eliminarVersionEquipo = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Versión equipo eliminada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar la versión equipo. ${error}`);
    }
  };

  return (
    <VersionEquipoContext.Provider
      value={{
        versionequipoList: state.versionequipoList,
        versionequipoActual: state.versionequipoActual,

        obtenerVersionEquipos,
        obtenerVersionEquipo,
        registrarVersionEquipo,
        actualizarVersionEquipo,
        eliminarVersionEquipo,
      }}>
      {props.children}
    </VersionEquipoContext.Provider>
  );
};
