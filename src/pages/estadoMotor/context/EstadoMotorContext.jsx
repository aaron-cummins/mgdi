import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import EstadoMotorReducer from "../reducer/EstadoMotorReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const EstadoMotorContext = createContext();

export const EstadoMotorContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "estadomotor";

  const initialState = {
    EstadoMotorList: [],
    EstadoMotorActual: null,
  };

  const [state, dispatch] = useReducer(EstadoMotorReducer, initialState);

  /* OBTENER LISTADO DE ESTADO MOTOR  */
  const obtenerEstadoMotores = async () => {
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

  /* OBTENER UN ESTADO MOTOR  */
  const obtenerEstadoMotor = async (EstadoMotor) => {
    try {
      let EstadoMotorEncontrado = null;
      if (EstadoMotor !== null) {
        const resultado = await callEndpoint(getByID(urlApi, EstadoMotor.id));
        if (resultado && resultado.data) {
          EstadoMotorEncontrado = resultado.data;
        }
      } else {
        EstadoMotorEncontrado = EstadoMotor;
      }

      dispatch({
        type: OBTENER,
        payload: EstadoMotorEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR ESTADO MOTOR  */
  const registrarEstadoMotor = async (EstadoMotor) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, EstadoMotor));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Estado Motor creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Estado Motor. ${error}`);
    }
  };

  /* ACTUALIZAR ESTADO MOTOR */
  const actualizarEstadoMotor = async (EstadoMotor) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, EstadoMotor));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Estado Motor actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Estado Motor. ${error}`);
    }
  };

  /* ELIMINAR ESTADO MOTOR  */
  const eliminarEstadoMotor = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Estado Motor eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Estado Motor. ${error}`);
    }
  };

  return (
    <EstadoMotorContext.Provider
      value={{
        EstadoMotorList: state.EstadoMotorList,
        EstadoMotorActual: state.EstadoMotorActual,

        obtenerEstadoMotores,
        obtenerEstadoMotor,
        registrarEstadoMotor,
        actualizarEstadoMotor,
        eliminarEstadoMotor,
      }}>
      {props.children}
    </EstadoMotorContext.Provider>
  );
};

export default EstadoMotorContext;
