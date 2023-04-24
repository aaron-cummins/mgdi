import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import tipoemisionReducer from "../reducer/tipoemisionReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const TipoEmisionContext = createContext();

export const TipoEmisionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "tipoemision";
  const initialState = {
    tipoemisionList: [],
    tipoemisionActual: null,
  };

  const [state, dispatch] = useReducer(tipoemisionReducer, initialState);

  /* OBETENER LISTADO DE TIPOEMISIONS */
  const obtenerTipoEmisiones = async () => {
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

  /* OBTENER UN TIPOEMISION */
  const obtenerTipoEmision = async (tipoemision) => {
    try {
      let tipoemisionEncontrado = null;
      if (tipoemision !== null) {
        const resultado = await callEndpoint(getByID(urlApi, tipoemision.id));
        if (resultado && resultado.data) {
          tipoemisionEncontrado = resultado.data;
        }
      } else {
        tipoemisionEncontrado = tipoemision;
      }

      dispatch({
        type: OBTENER,
        payload: tipoemisionEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPOEMISION */
  const registrarTipoEmision = async (tipoemision) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, tipoemision));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Tipo Admisión creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar crear el tipo admisión. ${error}` })
      );
    }
  };

  /* ACTUALIZAR TIPOEMISION */
  const actualizarTipoEmision = async (tipoemision) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, tipoemision));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Tipo Admisión actualizado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar actualizar el tipo admisión. ${error}` })
      );
    }
  };

  /* ELIMINAR TIPOEMISION */
  const eliminarTipoEmision = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Tipo Admisión eliminado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar eliminar el tipo admisión. ${error}` })
      );
    }
  };

  return (
    <TipoEmisionContext.Provider
      value={{
        tipoemisionList: state.tipoemisionList,
        tipoemisionActual: state.tipoemisionActual,

        obtenerTipoEmisiones,
        obtenerTipoEmision,
        registrarTipoEmision,
        actualizarTipoEmision,
        eliminarTipoEmision,
      }}>
      {props.children}
    </TipoEmisionContext.Provider>
  );
};
