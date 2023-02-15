import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import comunaReducer from "../reducer/comunaReducer.js";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const ComunaContext = createContext();

export const ComunaContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "comuna";
  const initialState = {
    comunaList: [],
    comunaActual: null,
  };

  const [state, dispatch] = useReducer(comunaReducer, initialState);

  /* OBETENER LISTADO DE COMUNAS */
  const obtenerComunas = async () => {
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

  /* OBTENER UNA COMUNA */
  const obtenerComuna = async (comuna) => {
    try {
      let comunaEncontrada = null;
      if (comuna !== null) {
        const resultado = await callEndpoint(getByID(urlApi, comuna.id));
        if (resultado && resultado.data) {
          comunaEncontrada = resultado.data;
        }
      } else {
        comunaEncontrada = comuna;
      }

      dispatch({
        type: OBTENER,
        payload: comunaEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR COMUNA */
  const registrarComuna = async (comuna) => {
    try {
      const resultado = await callEndpoint(postObject(`${urlApi}`, comuna));
      let resul = resultado.data;
      resul.region = comuna.region;
      dispatch({
        type: REGISTRAR,
        payload: resul,
      });
      alerta("success", "Comuna creada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear la comuna. ${error}`);
    }
  };

  /* ACTUALIZAR COMUNA */
  const actualizarComuna = async (comuna) => {
    try {
      const resultado = await callEndpoint(putObject(`${urlApi}`, comuna));
      let resul = resultado.data;
      resul.region = comuna.region;
      dispatch({
        type: ACTUALIZAR,
        payload: resul,
      });
      alerta("success", "Comuna actualizada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar la comuna. ${error}`);
    }
  };

  /* ELIMINAR COMUNA */
  const eliminarComuna = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Comuna eliminada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar la comuna. ${error}`);
    }
  };

  return (
    <ComunaContext.Provider
      value={{
        comunaList: state.comunaList,
        comunaActual: state.comunaActual,

        obtenerComunas,
        obtenerComuna,
        registrarComuna,
        actualizarComuna,
        eliminarComuna,
      }}>
      {props.children}
    </ComunaContext.Provider>
  );
};
