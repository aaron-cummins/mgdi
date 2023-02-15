import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import EstadoEquipoInstalacionReducer from "../reducer/EstadoEquipoInstalacionReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const EstadoEquipoInstalacionContext = createContext();

export const EstadoEquipoInstalacionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "estadoequipoinstalacion";

  const initialState = {
    EstadoEquipoInstalacionList: [],
    EstadoEquipoInstalacionActual: null,
  };

  const [state, dispatch] = useReducer(EstadoEquipoInstalacionReducer, initialState);

  /* OBTENER LISTADO DE ESTADO EQUIPO INSTALACION */
  const obtenerEstadoEquipoInstalaciones = async () => {
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

  /* OBTENER UN ESTADO EQUIPO INSTALACION */
  const obtenerEstadoEquipoInstalacion = async (EstadoEquipoInstalacion) => {
    try {
      let EstadoEquipoInstalacionEncontrado = null;
      if (EstadoEquipoInstalacion !== null) {
        const resultado = await callEndpoint(getByID(urlApi, EstadoEquipoInstalacion.id));
        if (resultado && resultado.data) {
          EstadoEquipoInstalacionEncontrado = resultado.data;
        }
      } else {
        EstadoEquipoInstalacionEncontrado = EstadoEquipoInstalacion;
      }

      dispatch({
        type: OBTENER,
        payload: EstadoEquipoInstalacionEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR ESTADO EQUIPO INSTALACION */
  const registrarEstadoEquipoInstalacion = async (EstadoEquipoInstalacion) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, EstadoEquipoInstalacion));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Estado Equipo Instalación creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Estado Equipo Instalación. ${error}`);
    }
  };

  /* ACTUALIZAR ESTADO EQUIPO INSTALACION*/
  const actualizarEstadoEquipoInstalacion = async (EstadoEquipoInstalacion) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, EstadoEquipoInstalacion));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Estado Equipo Instalación actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Estado Equipo Instalación. ${error}`);
    }
  };

  /* ELIMINAR ESTADO EQUIPO INSTALACION */
  const eliminarEstadoEquipoInstalacion = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Estado Equipo Instalación eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Estado Equipo Instalación. ${error}`);
    }
  };

  return (
    <EstadoEquipoInstalacionContext.Provider
      value={{
        EstadoEquipoInstalacionList: state.EstadoEquipoInstalacionList,
        EstadoEquipoInstalacionActual: state.EstadoEquipoInstalacionActual,

        obtenerEstadoEquipoInstalaciones,
        obtenerEstadoEquipoInstalacion,
        registrarEstadoEquipoInstalacion,
        actualizarEstadoEquipoInstalacion,
        eliminarEstadoEquipoInstalacion,
      }}>
      {props.children}
    </EstadoEquipoInstalacionContext.Provider>
  );
};

export default EstadoEquipoInstalacionContext;
