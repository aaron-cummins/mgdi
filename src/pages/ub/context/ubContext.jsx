import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import ubReducer from "../reducer/ubReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const UbContext = createContext();

export const UbContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "ub";

  const initialState = {
    ubList: [],
    ubActual: null,
  };

  const [state, dispatch] = useReducer(ubReducer, initialState);

  /* OBETENER LISTADO DE Ub */
  const obtenerUbs = async () => {
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

  /* OBTENER UN Ub*/
  const obtenerUb = async (am) => {
    try {
      let amEncontrado = null;
      if (am !== null) {
        const resultado = await callEndpoint(getByID(urlApi, am.id));
        if (resultado && resultado.data) {
          amEncontrado = resultado.data;
        }
      } else {
        amEncontrado = am;
      }

      dispatch({
        type: OBTENER,
        payload: amEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR Ub*/
  const registrarUb = async (am) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, am));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Ub creada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear la Ub. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR Ub */
  const actualizarUb = async (am) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, am));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Ub actualizada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar la Ub. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR Ub */
  const eliminarUb = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Ub eliminada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar la Ub. ${error}`,
        })
      );
    }
  };

  return (
    <UbContext.Provider
      value={{
        ubList: state.ubList,
        ubActual: state.ubActual,

        obtenerUbs,
        obtenerUb,
        registrarUb,
        actualizarUb,
        eliminarUb,
      }}>
      {props.children}
    </UbContext.Provider>
  );
};
