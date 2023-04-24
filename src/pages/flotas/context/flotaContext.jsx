import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import flotaReducer from "../reducer/flotaReducer.js";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const FlotaContext = createContext();

export const FlotaContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "flotas";
  const initialState = {
    flotaList: [],
    flotaActual: null,
  };

  const [state, dispatch] = useReducer(flotaReducer, initialState);

  /* OBETENER LISTADO DE FLOTAS */
  const obtenerFlotas = async () => {
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

  /* OBTENER UNA FLOTA */
  const obtenerFlota = async (flota) => {
    try {
      let flotaEncontrada = null;
      if (flota !== null) {
        const resultado = await callEndpoint(getByID(urlApi, flota.id));
        if (resultado && resultado.data) {
          flotaEncontrada = resultado.data;
        }
      } else {
        flotaEncontrada = flota;
      }

      dispatch({
        type: OBTENER,
        payload: flotaEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR FLOTA */
  const registrarFlota = async (flota) => {
    try {
      const resultado = await callEndpoint(postObject(`${urlApi}`, flota));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Flota creada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear la flota. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR FLOTA */
  const actualizarFlota = async (flota) => {
    try {
      const resultado = await callEndpoint(putObject(`${urlApi}`, flota));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Flota actualizada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar la flota. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR FLOTA */
  const eliminarFlota = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Flota eliminada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar la flota. ${error}`,
        })
      );
    }
  };

  return (
    <FlotaContext.Provider
      value={{
        flotaList: state.flotaList,
        flotaActual: state.flotaActual,

        obtenerFlotas,
        obtenerFlota,
        registrarFlota,
        actualizarFlota,
        eliminarFlota,
      }}>
      {props.children}
    </FlotaContext.Provider>
  );
};
