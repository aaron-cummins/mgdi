import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import paisReducer from "../reducer/paisReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const PaisContext = createContext();

export const PaisContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "pais";
  const initialState = {
    paisList: [],
    paisActual: null,
  };

  const [state, dispatch] = useReducer(paisReducer, initialState);

  /* OBETENER LISTADO DE PAISS */
  const obtenerPaises = async () => {
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

  /* OBTENER UNA PAIS */
  const obtenerPais = async (pais) => {
    try {
      let paisEncontrada = null;
      if (pais !== null) {
        const resultado = await callEndpoint(getByID(urlApi, pais.id));
        if (resultado && resultado.data) {
          paisEncontrada = resultado.data;
        }
      } else {
        paisEncontrada = pais;
      }

      dispatch({
        type: OBTENER,
        payload: paisEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR PAIS */
  const registrarPais = async (pais) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, pais));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "País creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el país. ${error}`);
    }
  };

  /* ACTUALIZAR PAIS */
  const actualizarPais = async (pais) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, pais));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "País actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el país. ${error}`);
    }
  };

  /* ELIMINAR PAIS */
  const eliminarPais = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "País eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el país. ${error}`);
    }
  };

  return (
    <PaisContext.Provider
      value={{
        paisList: state.paisList,
        paisActual: state.paisActual,

        obtenerPaises,
        obtenerPais,
        registrarPais,
        actualizarPais,
        eliminarPais,
      }}>
      {props.children}
    </PaisContext.Provider>
  );
};
