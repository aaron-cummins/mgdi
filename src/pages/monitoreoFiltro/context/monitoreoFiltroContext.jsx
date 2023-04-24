import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import monitoreoFiltroReducer from "../reducer/monitoreoFiltroReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const MonitoreoFiltroContext = createContext();

export const MonitoreoFiltroContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();

  const urlApi = "monitoreofiltro";

  const initialState = {
    monitoreofiltroList: [],
    monitoreofiltroActual: null,
  };

  const [state, dispatch] = useReducer(monitoreoFiltroReducer, initialState);

  /* OBETENER LISTADO DE MONITOREOFILTROS */
  const obtenerMonitoreoFiltros = async () => {
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

  /* OBTENER UN MONITOREOFILTRO */
  const obtenerMonitoreoFiltro = async (monitoreofiltro) => {
    try {
      let monitoreofiltroEncontrado = null;
      if (monitoreofiltro !== null) {
        const resultado = await callEndpoint(getByID(urlApi, monitoreofiltro.id));
        if (resultado && resultado.data) {
          monitoreofiltroEncontrado = resultado.data;
        }
      } else {
        monitoreofiltroEncontrado = monitoreofiltro;
      }

      dispatch({
        type: OBTENER,
        payload: monitoreofiltroEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR MONITOREOFILTRO */
  const registrarMonitoreoFiltro = async (monitoreofiltro) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, monitoreofiltro));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Monitoreo Filtro creado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar crear el monitoreo filtro. ${error}` })
      );
    }
  };

  /* ACTUALIZAR MONITOREOFILTRO */
  const actualizarMonitoreoFiltro = async (monitoreofiltro) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, monitoreofiltro));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Monitoreo Filtro actualizado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar actualizar el monitoreo filtro. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR MONITOREOFILTRO */
  const eliminarMonitoreoFiltro = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Monitoreo Filtro eliminado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar eliminar el monitoreo filtro. ${error}`,
        })
      );
    }
  };

  return (
    <MonitoreoFiltroContext.Provider
      value={{
        monitoreofiltroList: state.monitoreofiltroList,
        monitoreofiltroActual: state.monitoreofiltroActual,

        obtenerMonitoreoFiltros,
        obtenerMonitoreoFiltro,
        registrarMonitoreoFiltro,
        actualizarMonitoreoFiltro,
        eliminarMonitoreoFiltro,
      }}>
      {props.children}
    </MonitoreoFiltroContext.Provider>
  );
};
