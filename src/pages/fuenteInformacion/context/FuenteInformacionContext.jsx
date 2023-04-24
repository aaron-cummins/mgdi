import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import FuenteInformacionReducer from "../reducer/FuenteInformacionReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
export const FuenteInformacionContext = createContext();

export const FuenteInformacionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();

  const urlApi = "fuenteinformacion";

  const initialState = {
    FuenteInformacionList: [],
    FuenteInformacionActual: null,
  };

  const [state, dispatch] = useReducer(FuenteInformacionReducer, initialState);

  /* OBTENER LISTADO DE FUENTE INFORMACION */
  const obtenerFuenteInformaciones = async () => {
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

  /* OBTENER UN FUENTE INFORMACION */
  const obtenerFuenteInformacion = async (FuenteInformacion) => {
    try {
      let FuenteInformacionEncontrado = null;
      if (FuenteInformacion !== null) {
        const resultado = await callEndpoint(getByID(urlApi, FuenteInformacion.id));
        if (resultado && resultado.data) {
          FuenteInformacionEncontrado = resultado.data;
        }
      } else {
        FuenteInformacionEncontrado = FuenteInformacion;
      }

      dispatch({
        type: OBTENER,
        payload: FuenteInformacionEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR FUENTE INFORMACION*/
  const registrarFuenteInformacion = async (FuenteInformacion) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, FuenteInformacion));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Fuente Informacion creada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear la Fuente Informacion. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR FUENTE INFORMACION*/
  const actualizarFuenteInformacion = async (FuenteInformacion) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, FuenteInformacion));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Fuente Informacion actualizada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar la Fuente Informacion. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR FUENTE INFORMACION */
  const eliminarFuenteInformacion = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Fuente Informacion eliminada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar la Fuente Informacion. ${error}`,
        })
      );
    }
  };

  return (
    <FuenteInformacionContext.Provider
      value={{
        FuenteInformacionList: state.FuenteInformacionList,
        FuenteInformacionActual: state.FuenteInformacionActual,

        obtenerFuenteInformaciones,
        obtenerFuenteInformacion,
        registrarFuenteInformacion,
        actualizarFuenteInformacion,
        eliminarFuenteInformacion,
      }}>
      {props.children}
    </FuenteInformacionContext.Provider>
  );
};

export default FuenteInformacionContext;
