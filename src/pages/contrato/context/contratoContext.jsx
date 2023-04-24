import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
//import { getContratoList, getContrato, postContrato, putContrato, deleteContrato } from 'services/contratoService';
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import contratoReducer from "../reducer/contratoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const ContratoContext = createContext();

export const ContratoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "contrato";

  const initialState = {
    contratoList: [],
    contratoActual: null,
  };

  const [state, dispatch] = useReducer(contratoReducer, initialState);

  /* OBETENER LISTADO DE CONTRATOS */
  const obtenerContratos = async () => {
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

  /* OBTENER UN CONTRATO */
  const obtenerContrato = async (contrato) => {
    try {
      let contratoEncontrado = null;
      if (contrato !== null) {
        const resultado = await callEndpoint(getByID(urlApi, contrato.id));
        if (resultado && resultado.data) {
          contratoEncontrado = resultado.data;
        }
      } else {
        contratoEncontrado = contrato;
      }

      dispatch({
        type: OBTENER,
        payload: contratoEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR CONTRATO */
  const registrarContrato = async (contrato) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, contrato));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Contrato creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear el contrato. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR CONTRATO */
  const actualizarContrato = async (contrato) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, contrato));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Contrato actualizado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar el contrato. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR CONTRATO */
  const eliminarContrato = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Contrato eliminado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar el contrato. ${error}`,
        })
      );
    }
  };

  return (
    <ContratoContext.Provider
      value={{
        contratoList: state.contratoList,
        contratoActual: state.contratoActual,

        obtenerContratos,
        obtenerContrato,
        registrarContrato,
        actualizarContrato,
        eliminarContrato,
      }}>
      {props.children}
    </ContratoContext.Provider>
  );
};
