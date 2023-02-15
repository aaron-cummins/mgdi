import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import tipoinyeccionReducer from "../reducer/tipoinyeccionReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const TipoInyeccionContext = createContext();

export const TipoInyeccionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "tipoinyeccion";

  const initialState = {
    tipoinyeccionList: [],
    tipoinyeccionActual: null,
  };

  const [state, dispatch] = useReducer(tipoinyeccionReducer, initialState);

  /* OBETENER LISTADO DE TIPOINYECCIONS */
  const obtenerTipoInyecciones = async () => {
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

  /* OBTENER UN TIPOINYECCION */
  const obtenerTipoInyeccion = async (tipoinyeccion) => {
    try {
      let tipoinyeccionEncontrado = null;
      if (tipoinyeccion !== null) {
        const resultado = await callEndpoint(getByID(urlApi, tipoinyeccion.id));
        if (resultado && resultado.data) {
          tipoinyeccionEncontrado = resultado.data;
        }
      } else {
        tipoinyeccionEncontrado = tipoinyeccion;
      }

      dispatch({
        type: OBTENER,
        payload: tipoinyeccionEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPOINYECCION */
  const registrarTipoInyeccion = async (tipoinyeccion) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, tipoinyeccion));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Admisión creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el tipo admisión. ${error}`);
    }
  };

  /* ACTUALIZAR TIPOINYECCION */
  const actualizarTipoInyeccion = async (tipoinyeccion) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, tipoinyeccion));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Admisión actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el tipo admisión. ${error}`);
    }
  };

  /* ELIMINAR TIPOINYECCION */
  const eliminarTipoInyeccion = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Tipo Admisión eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el tipo admisión. ${error}`);
    }
  };

  return (
    <TipoInyeccionContext.Provider
      value={{
        tipoinyeccionList: state.tipoinyeccionList,
        tipoinyeccionActual: state.tipoinyeccionActual,

        obtenerTipoInyecciones,
        obtenerTipoInyeccion,
        registrarTipoInyeccion,
        actualizarTipoInyeccion,
        eliminarTipoInyeccion,
      }}>
      {props.children}
    </TipoInyeccionContext.Provider>
  );
};
