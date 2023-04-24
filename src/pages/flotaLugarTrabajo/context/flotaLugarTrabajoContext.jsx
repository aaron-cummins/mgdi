import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import flotaLugarTrabajoReducer from "../reducer/flotaLugarTrabajoReducer.js";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const FlotaLugarTrabajoContext = createContext();

export const FlotaLugarTrabajoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();

  const urlApi = "flotalugartrabajo";

  const initialState = {
    flotaLugarTrabajoList: [],
    flotaLugarTrabajoActual: null,
  };

  const [state, dispatch] = useReducer(flotaLugarTrabajoReducer, initialState);

  /* OBETENER LISTADO DE Flotas LugarTrabajo */
  const obtenerFlotasLugarTrabajoList = async () => {
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

  /* OBTENER UNA Flota LugarTrabajo */
  const obtenerFlotaLugarTrabajo = async (flota) => {
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
  const registrarFlotaLugarTrabajo = async (flota) => {
    try {
      const resultado = await callEndpoint(postObject(`${urlApi}`, flota));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Flota asignada a lugar de trabajo con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar asignar la flota. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR Flota LugarTrabajo */
  const actualizarFlotaLugarTrabajo = async (flota) => {
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

  /* ELIMINAR Flota LugarTrabajo */
  const eliminarFlotaLugarTrabajo = async (id) => {
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
    <FlotaLugarTrabajoContext.Provider
      value={{
        flotaLugarTrabajoList: state.flotaLugarTrabajoList,
        flotaLugarTrabajoActual: state.flotaLugarTrabajoActual,

        obtenerFlotasLugarTrabajoList,
        obtenerFlotaLugarTrabajo,
        registrarFlotaLugarTrabajo,
        actualizarFlotaLugarTrabajo,
        eliminarFlotaLugarTrabajo,
      }}>
      {props.children}
    </FlotaLugarTrabajoContext.Provider>
  );
};
