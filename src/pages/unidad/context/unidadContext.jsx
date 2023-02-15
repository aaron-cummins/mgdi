import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import unidadReducer from "../reducer/unidadReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const UnidadContext = createContext();

export const UnidadContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "unidad";

  const initialState = {
    unidadList: [],
    unidadActual: null,
  };

  const [state, dispatch] = useReducer(unidadReducer, initialState);

  /* OBETENER LISTADO DE UNIDADS */
  const obtenerUnidadlist = async () => {
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

  /* OBTENER UNA UNIDAD */
  const obtenerUnidad = async (unidad) => {
    try {
      let unidadEncontrada = null;
      if (unidad !== null) {
        const resultado = await callEndpoint(getByID(urlApi, unidad.id));
        if (resultado && resultado.data) {
          unidadEncontrada = resultado.data;
        }
      } else {
        unidadEncontrada = unidad;
      }

      dispatch({
        type: OBTENER,
        payload: unidadEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR UNIDAD */
  const registrarUnidad = async (unidad) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, unidad));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Unidad creada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear la Unidad. ${error}`);
    }
  };

  /* ACTUALIZAR UNIDAD */
  const actualizarUnidad = async (unidad) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, unidad));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Unidad actualizada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar la Unidad. ${error}`);
    }
  };

  /* ELIMINAR UNIDAD */
  const eliminarUnidad = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Unidad eliminada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar la Unidad. ${error}`);
    }
  };

  return (
    <UnidadContext.Provider
      value={{
        unidadList: state.unidadList,
        unidadActual: state.unidadActual,

        obtenerUnidadlist,
        obtenerUnidad,
        registrarUnidad,
        actualizarUnidad,
        eliminarUnidad,
      }}>
      {props.children}
    </UnidadContext.Provider>
  );
};
