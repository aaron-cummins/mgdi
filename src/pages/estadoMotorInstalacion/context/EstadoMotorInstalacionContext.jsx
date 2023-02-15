import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import EstadoMotorInstalacionReducer from "../reducer/EstadoMotorInstalacionReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const EstadoMotorInstalacionContext = createContext();

export const EstadoMotorInstalacionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "estadomotorinstalacion";

  const initialState = {
    EstadoMotorInstalacionList: [],
    EstadoMotorInstalacionActual: null,
  };

  const [state, dispatch] = useReducer(EstadoMotorInstalacionReducer, initialState);

  /* OBTENER LISTADO DE ESTADO MOTOR INSTALACION */
  const obtenerEstadoMotorInstalaciones = async () => {
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

  /* OBTENER UN ESTADO MOTOR INSTALACION */
  const obtenerEstadoMotorInstalacion = async (EstadoMotorInstalacion) => {
    try {
      let EstadoMotorInstalacionEncontrado = null;
      if (EstadoMotorInstalacion !== null) {
        const resultado = await callEndpoint(getByID(urlApi, EstadoMotorInstalacion.id));
        if (resultado && resultado.data) {
          EstadoMotorInstalacionEncontrado = resultado.data;
        }
      } else {
        EstadoMotorInstalacionEncontrado = EstadoMotorInstalacion;
      }

      dispatch({
        type: OBTENER,
        payload: EstadoMotorInstalacionEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR ESTADO MOTOR INSTALACION */
  const registrarEstadoMotorInstalacion = async (EstadoMotorInstalacion) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, EstadoMotorInstalacion));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Estado Motor Instalación creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Estado Motor Instalación. ${error}`);
    }
  };

  /* ACTUALIZAR ESTADO MOTOR INSTALACION*/
  const actualizarEstadoMotorInstalacion = async (EstadoMotorInstalacion) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, EstadoMotorInstalacion));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Estado Motor Instalación actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Estado Motor Instalación. ${error}`);
    }
  };

  /* ELIMINAR ESTADO MOTOR INSTALACION */
  const eliminarEstadoMotorInstalacion = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Estado Motor Instalación eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Estado Motor Instalación. ${error}`);
    }
  };

  return (
    <EstadoMotorInstalacionContext.Provider
      value={{
        EstadoMotorInstalacionList: state.EstadoMotorInstalacionList,
        EstadoMotorInstalacionActual: state.EstadoMotorInstalacionActual,

        obtenerEstadoMotorInstalaciones,
        obtenerEstadoMotorInstalacion,
        registrarEstadoMotorInstalacion,
        actualizarEstadoMotorInstalacion,
        eliminarEstadoMotorInstalacion,
      }}>
      {props.children}
    </EstadoMotorInstalacionContext.Provider>
  );
};

export default EstadoMotorInstalacionContext;
