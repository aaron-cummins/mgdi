import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import tipofiltradoReducer from "../reducer/tipofiltradoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const TipoFiltradoContext = createContext();

export const TipoFiltradoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "tipofiltrado";
  const initialState = {
    tipofiltradoList: [],
    tipofiltradoActual: null,
  };

  const [state, dispatch] = useReducer(tipofiltradoReducer, initialState);

  /* OBETENER LISTADO DE TIPOFILTRADOS */
  const obtenerTipoFiltrados = async () => {
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

  /* OBTENER UN TIPOFILTRADO */
  const obtenerTipoFiltrado = async (tipofiltrado) => {
    try {
      let tipofiltradoEncontrado = null;
      if (tipofiltrado !== null) {
        const resultado = await callEndpoint(getByID(urlApi, tipofiltrado.id));
        if (resultado && resultado.data) {
          tipofiltradoEncontrado = resultado.data;
        }
      } else {
        tipofiltradoEncontrado = tipofiltrado;
      }

      dispatch({
        type: OBTENER,
        payload: tipofiltradoEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPOFILTRADO */
  const registrarTipoFiltrado = async (tipofiltrado) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, tipofiltrado));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Filtrado creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el tipo filtrado. ${error}`);
    }
  };

  /* ACTUALIZAR TIPOFILTRADO */
  const actualizarTipoFiltrado = async (tipofiltrado) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, tipofiltrado));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Filtrado actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el tipo filtrado. ${error}`);
    }
  };

  /* ELIMINAR TIPOFILTRADO */
  const eliminarTipoFiltrado = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Tipo Filtrado eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el tipo filtrado. ${error}`);
    }
  };

  return (
    <TipoFiltradoContext.Provider
      value={{
        tipofiltradoList: state.tipofiltradoList,
        tipofiltradoActual: state.tipofiltradoActual,

        obtenerTipoFiltrados,
        obtenerTipoFiltrado,
        registrarTipoFiltrado,
        actualizarTipoFiltrado,
        eliminarTipoFiltrado,
      }}>
      {props.children}
    </TipoFiltradoContext.Provider>
  );
};
