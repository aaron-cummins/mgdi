import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import aplicacionReducer from "../reducer/aplicacionReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

import { useStateContext } from "contexts/ContextProvider";

export const AplicacionContext = createContext();

export const AplicacionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "aplicacion";

  const initialState = {
    aplicacionList: [],
    aplicacionActual: null,
  };

  const [state, dispatch] = useReducer(aplicacionReducer, initialState);

  /* OBETENER LISTADO DE APLICACIONS */
  const obtenerAplicaciones = async () => {
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

  /* OBTENER UN APLICACION */
  const obtenerAplicacion = async (aplicacion) => {
    try {
      let aplicacionEncontrado = null;
      if (aplicacion !== null) {
        const resultado = await callEndpoint(getByID(urlApi, aplicacion.id));
        if (resultado && resultado.data) {
          aplicacionEncontrado = resultado.data;
        }
      } else {
        aplicacionEncontrado = aplicacion;
      }

      dispatch({
        type: OBTENER,
        payload: aplicacionEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR APLICACION */
  const registrarAplicacion = async (aplicacion) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, aplicacion));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Aplicación creada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear la aplicación. ${error}`);
    }
  };

  /* ACTUALIZAR APLICACION */
  const actualizarAplicacion = async (aplicacion) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, aplicacion));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Aplicación actualizada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar la aplicación. ${error}`);
    }
  };

  /* ELIMINAR APLICACION */
  const eliminarAplicacion = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Aplicación eliminada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar la aplicación. ${error}`);
    }
  };

  return (
    <AplicacionContext.Provider
      value={{
        aplicacionList: state.aplicacionList,
        aplicacionActual: state.aplicacionActual,

        obtenerAplicaciones,
        obtenerAplicacion,
        registrarAplicacion,
        actualizarAplicacion,
        eliminarAplicacion,
      }}>
      {props.children}
    </AplicacionContext.Provider>
  );
};
