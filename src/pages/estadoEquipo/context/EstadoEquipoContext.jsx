import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import EstadoEquipoReducer from "../reducer/EstadoEquipoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const EstadoEquipoContext = createContext();

export const EstadoEquipoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "estadoequipo";

  const initialState = {
    EstadoEquipoList: [],
    EstadoEquipoActual: null,
  };

  const [state, dispatch] = useReducer(EstadoEquipoReducer, initialState);

  /* OBTENER LISTADO DE ESTADO EQUIPO */
  const obtenerEstadoEquipos = async () => {
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

  /* OBTENER UN ESTADO EQUIPO */
  const obtenerEstadoEquipo = async (EstadoEquipo) => {
    try {
      let EstadoEquipoEncontrado = null;
      if (EstadoEquipo !== null) {
        const resultado = await callEndpoint(getByID(urlApi, EstadoEquipo.id));
        if (resultado && resultado.data) {
          EstadoEquipoEncontrado = resultado.data;
        }
      } else {
        EstadoEquipoEncontrado = EstadoEquipo;
      }

      dispatch({
        type: OBTENER,
        payload: EstadoEquipoEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR ESTADO EQUIPO */
  const registrarEstadoEquipo = async (EstadoEquipo) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, EstadoEquipo));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Estado Equipo creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Estado Equipo. ${error}`);
    }
  };

  /* ACTUALIZAR ESTADO EQUIPO*/
  const actualizarEstadoEquipo = async (EstadoEquipo) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, EstadoEquipo));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Estado Equipo actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Estado Equipo. ${error}`);
    }
  };

  /* ELIMINAR ESTADO EQUIPO */
  const eliminarEstadoEquipo = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Estado Equipo eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Estado Equipo. ${error}`);
    }
  };

  return (
    <EstadoEquipoContext.Provider
      value={{
        EstadoEquipoList: state.EstadoEquipoList,
        EstadoEquipoActual: state.EstadoEquipoActual,

        obtenerEstadoEquipos,
        obtenerEstadoEquipo,
        registrarEstadoEquipo,
        actualizarEstadoEquipo,
        eliminarEstadoEquipo,
      }}>
      {props.children}
    </EstadoEquipoContext.Provider>
  );
};

export default EstadoEquipoContext;
