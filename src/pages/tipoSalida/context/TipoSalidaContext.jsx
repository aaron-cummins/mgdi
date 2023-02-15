import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import TipoSalidaReducer from "../reducer/TipoSalidaReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const TipoSalidaContext = createContext();

export const TipoSalidaContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "tiposalida";

  const initialState = {
    TipoSalidaList: [],
    TipoSalidaActual: null,
  };

  const [state, dispatch] = useReducer(TipoSalidaReducer, initialState);

  /* OBTENER LISTADO DE TIPO SALIDA*/
  const obtenerTipoSalidas = async () => {
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

  /* OBTENER UN TIPO SALIDA */
  const obtenerTipoSalida = async (TipoSalida) => {
    try {
      let TipoSalidaEncontrado = null;
      if (TipoSalida !== null) {
        const resultado = await callEndpoint(getByID(urlApi, TipoSalida.id));
        if (resultado && resultado.data) {
          TipoSalidaEncontrado = resultado.data;
        }
      } else {
        TipoSalidaEncontrado = TipoSalida;
      }

      dispatch({
        type: OBTENER,
        payload: TipoSalidaEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPO SALIDA */
  const registrarTipoSalida = async (TipoSalida) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, TipoSalida));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Salida creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Tipo Salida. ${error}`);
    }
  };

  /* ACTUALIZAR TIPO SALIDA*/
  const actualizarTipoSalida = async (TipoSalida) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, TipoSalida));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Salida actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Tipo Salida. ${error}`);
    }
  };

  /* ELIMINAR TIPO SALIDA */
  const eliminarTipoSalida = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Tipo Salida eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Tipo Salida. ${error}`);
    }
  };

  return (
    <TipoSalidaContext.Provider
      value={{
        TipoSalidaList: state.TipoSalidaList,
        TipoSalidaActual: state.TipoSalidaActual,

        obtenerTipoSalidas,
        obtenerTipoSalida,
        registrarTipoSalida,
        actualizarTipoSalida,
        eliminarTipoSalida,
      }}>
      {props.children}
    </TipoSalidaContext.Provider>
  );
};

export default TipoSalidaContext;
