import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import esnReducer from "../reducer/esnReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

import { useStateContext } from "contexts/ContextProvider";

export const EsnContext = createContext();

export const EsnContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "esn";

  const initialState = {
    esnList: [],
    esnActual: null,
  };

  const [state, dispatch] = useReducer(esnReducer, initialState);

  /* OBETENER LISTADO DE ESNS */
  const obtenerEsnes = async () => {
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

  /* OBTENER UN ESN */
  const obtenerEsn = async (esn) => {
    try {
      let esnEncontrado = null;
      if (esn !== null) {
        const resultado = await callEndpoint(getByID(urlApi, esn.id));
        if (resultado && resultado.data) {
          esnEncontrado = resultado.data;
        }
      } else {
        esnEncontrado = esn;
      }

      dispatch({
        type: OBTENER,
        payload: esnEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR ESN */
  const registrarEsn = async (esn) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, esn));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Esn creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el esn. ${error}`);
    }
  };

  /* ACTUALIZAR ESN */
  const actualizarEsn = async (esn) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, esn));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Esn actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el esn. ${error}`);
    }
  };

  /* ELIMINAR ESN */
  const eliminarEsn = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Esn eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el esn. ${error}`);
    }
  };

  return (
    <EsnContext.Provider
      value={{
        esnList: state.esnList,
        esnActual: state.esnActual,

        obtenerEsnes,
        obtenerEsn,
        registrarEsn,
        actualizarEsn,
        eliminarEsn,
      }}>
      {props.children}
    </EsnContext.Provider>
  );
};
