import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import aplicacionOemReducer from "../reducer/aplicacionOemReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const AplicacionOemContext = createContext();

export const AplicacionOemContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "aplicacionoem";

  const initialState = {
    aplicacionOemList: [],
    aplicacionOemActual: null,
  };

  const [state, dispatch] = useReducer(aplicacionOemReducer, initialState);

  /* OBETENER LISTADO DE APLICACIONOEMS */
  const obtenerAplicacionesOem = async () => {
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

  /* OBTENER UN APLICACIONOEM */
  const obtenerAplicacionOem = async (aplicacionoem) => {
    try {
      let aplicacionoemEncontrado = null;
      if (aplicacionoem !== null) {
        const resultado = await callEndpoint(getByID(urlApi, aplicacionoem.id));
        if (resultado && resultado.data) {
          aplicacionoemEncontrado = resultado.data;
        }
      } else {
        aplicacionoemEncontrado = aplicacionoem;
      }

      dispatch({
        type: OBTENER,
        payload: aplicacionoemEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR APLICACIONOEM */
  const registrarAplicacionOem = async (aplicacionoem) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, aplicacionoem));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Aplicación Oem creada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear la aplicación oem. ${error}`);
    }
  };

  /* ACTUALIZAR APLICACIONOEM */
  const actualizarAplicacionOem = async (aplicacionoem) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, aplicacionoem));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Aplicación Oem actualizada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar la aplicación oem. ${error}`);
    }
  };

  /* ELIMINAR APLICACIONOEM */
  const eliminarAplicacionOem = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Aplicación Oem eliminada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar la aplicación oem. ${error}`);
    }
  };

  return (
    <AplicacionOemContext.Provider
      value={{
        aplicacionOemList: state.aplicacionOemList,
        aplicacionOemActual: state.aplicacionOemActual,

        obtenerAplicacionesOem,
        obtenerAplicacionOem,
        registrarAplicacionOem,
        actualizarAplicacionOem,
        eliminarAplicacionOem,
      }}>
      {props.children}
    </AplicacionOemContext.Provider>
  );
};
