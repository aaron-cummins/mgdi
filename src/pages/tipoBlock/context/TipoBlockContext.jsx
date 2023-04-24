import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import TipoBlockReducer from "../reducer/TipoBlockReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const TipoBlockContext = createContext();

export const TipoBlockContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();

  const urlApi = "tipoblock";

  const initialState = {
    TipoBlockList: [],
    TipoBlockActual: null,
  };

  const [state, dispatch] = useReducer(TipoBlockReducer, initialState);

  /* OBTENER LISTADO DE TIPO BLOCK */
  const obtenerTipoBlocks = async () => {
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

  /* OBTENER UN TIPO BLOCK */
  const obtenerTipoBlock = async (tipoblock) => {
    try {
      let tipoblockEncontrado = null;
      if (tipoblock !== null) {
        const resultado = await callEndpoint(getByID(urlApi, tipoblock.id));
        if (resultado && resultado.data) {
          tipoblockEncontrado = resultado.data;
        }
      } else {
        tipoblockEncontrado = tipoblock;
      }

      dispatch({
        type: OBTENER,
        payload: tipoblockEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPOBLOCK */
  const registrarTipoBlock = async (tipoblock) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, tipoblock));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Tipo Block creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar crear el Tipo Block. ${error}` })
      );
    }
  };

  /* ACTUALIZAR TIPOBLOCK*/
  const actualizarTipoBlock = async (tipoblock) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, tipoblock));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Tipo Block actualizado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar actualizar el Tipo Block. ${error}` })
      );
    }
  };

  /* ELIMINAR TIPOBLOCK */
  const eliminarTipoBlock = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Tipo block eliminado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar eliminar el Tipo block. ${error}` })
      );
    }
  };

  return (
    <TipoBlockContext.Provider
      value={{
        TipoBlockList: state.TipoBlockList,
        TipoBlockActual: state.TipoBlockActual,

        obtenerTipoBlocks,
        obtenerTipoBlock,
        registrarTipoBlock,
        actualizarTipoBlock,
        eliminarTipoBlock,
      }}>
      {props.children}
    </TipoBlockContext.Provider>
  );
};

export default TipoBlockContextProvider;
