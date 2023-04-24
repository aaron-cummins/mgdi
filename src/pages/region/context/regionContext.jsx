import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import regionReducer from "../reducer/regionReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const RegionContext = createContext();

export const RegionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "region";

  const initialState = {
    regionList: [],
    regionListActiva: [],
    regionActual: null,
  };

  const [state, dispatch] = useReducer(regionReducer, initialState);

  /* OBETENER LISTADO DE REGIONES */
  const obtenerRegiones = async () => {
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

  /* OBTENER UNA REGION */
  const obtenerRegion = async (region) => {
    try {
      let regionEncontrada = null;
      if (region !== null) {
        const resultado = await callEndpoint(getByID(urlApi, region.id));
        if (resultado && resultado.data) {
          regionEncontrada = resultado.data;
        }
      } else {
        regionEncontrada = region;
      }

      dispatch({
        type: OBTENER,
        payload: regionEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR REGION */
  const registrarRegion = async (region) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, region));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Región creada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar crear la región. ${error}` })
      );
    }
  };

  /* ACTUALIZAR REGION */
  const actualizarRegion = async (region) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, region));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Región actualizada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar actualizar la región. ${error}` })
      );
    }
  };

  /* ELIMINAR REGION */
  const eliminarRegion = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Región eliminada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar eliminar la región. ${error}` })
      );
    }
  };

  return (
    <RegionContext.Provider
      value={{
        regionList: state.regionList,
        regionActual: state.regionActual,

        obtenerRegiones,
        obtenerRegion,
        registrarRegion,
        actualizarRegion,
        eliminarRegion,
      }}>
      {props.children}
    </RegionContext.Provider>
  );
};
