import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import MotivoCambioReducer from "../reducer/MotivoCambioReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const MotivoCambioContext = createContext();

export const MotivoCambioContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();

  const urlApi = "motivocambio";

  const initialState = {
    MotivoCambioList: [],
    MotivoCambioActual: null,
  };

  const [state, dispatch] = useReducer(MotivoCambioReducer, initialState);

  /* OBTENER LISTADO DE MOTIVO CAMBIO */
  const obtenerMotivoCambios = async () => {
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

  /* OBTENER UN MOTIVO CAMBIO */
  const obtenerMotivoCambio = async (MotivoCambio) => {
    try {
      let MotivoCambioEncontrado = null;
      if (MotivoCambio !== null) {
        const resultado = await callEndpoint(getByID(urlApi, MotivoCambio.id));
        if (resultado && resultado.data) {
          MotivoCambioEncontrado = resultado.data;
        }
      } else {
        MotivoCambioEncontrado = MotivoCambio;
      }

      dispatch({
        type: OBTENER,
        payload: MotivoCambioEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR MOTIVO CAMBIO */
  const registrarMotivoCambio = async (MotivoCambio) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, MotivoCambio));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Motivo Cambio creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear el Motivo Cambio. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR MOTIVO CAMBIO*/
  const actualizarMotivoCambio = async (MotivoCambio) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, MotivoCambio));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Motivo Cambio actualizado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar el Motivo Cambio. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR MOTIVO CAMBIO */
  const eliminarMotivoCambio = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Motivo Cambio eliminado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar el Motivo Cambio. ${error}`,
        })
      );
    }
  };

  return (
    <MotivoCambioContext.Provider
      value={{
        MotivoCambioList: state.MotivoCambioList,
        MotivoCambioActual: state.MotivoCambioActual,

        obtenerMotivoCambios,
        obtenerMotivoCambio,
        registrarMotivoCambio,
        actualizarMotivoCambio,
        eliminarMotivoCambio,
      }}>
      {props.children}
    </MotivoCambioContext.Provider>
  );
};

export default MotivoCambioContext;
