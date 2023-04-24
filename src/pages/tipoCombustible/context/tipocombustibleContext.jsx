import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import tipocombustibleReducer from "../reducer/tipocombustibleReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const TipoCombustibleContext = createContext();

export const TipoCombustibleContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "tipocombustible";

  const initialState = {
    tipocombustibleList: [],
    tipocombustibleActual: null,
  };

  const [state, dispatch] = useReducer(tipocombustibleReducer, initialState);

  /* OBETENER LISTADO DE TIPOCOMBUSTIBLES */
  const obtenerTipoCombustibles = async () => {
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

  /* OBTENER UN TIPOCOMBUSTIBLE */
  const obtenerTipoCombustible = async (tipocombustible) => {
    try {
      let tipocombustibleEncontrado = null;
      if (tipocombustible !== null) {
        const resultado = await callEndpoint(getByID(urlApi, tipocombustible.id));
        if (resultado && resultado.data) {
          tipocombustibleEncontrado = resultado.data;
        }
      } else {
        tipocombustibleEncontrado = tipocombustible;
      }

      dispatch({
        type: OBTENER,
        payload: tipocombustibleEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPOCOMBUSTIBLE */
  const registrarTipoCombustible = async (tipocombustible) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, tipocombustible));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Tipo Combustible creado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear el tipo combustible. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR TIPOCOMBUSTIBLE */
  const actualizarTipoCombustible = async (tipocombustible) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, tipocombustible));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Tipo Combustible actualizado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar el tipo combustible. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR TIPOCOMBUSTIBLE */
  const eliminarTipoCombustible = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Tipo Combustible eliminado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar el tipo combustible. ${error}`,
        })
      );
    }
  };

  return (
    <TipoCombustibleContext.Provider
      value={{
        tipocombustibleList: state.tipocombustibleList,
        tipocombustibleActual: state.tipocombustibleActual,

        obtenerTipoCombustibles,
        obtenerTipoCombustible,
        registrarTipoCombustible,
        actualizarTipoCombustible,
        eliminarTipoCombustible,
      }}>
      {props.children}
    </TipoCombustibleContext.Provider>
  );
};
