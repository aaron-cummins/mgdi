import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import motorReducer from "../reducer/motorReducer.js";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const MotorContext = createContext();

export const MotorContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "motor";
  const initialState = {
    motorList: [],
    motorActual: null,
  };

  const [state, dispatch] = useReducer(motorReducer, initialState);

  /* OBETENER LISTADO DE MOTORS */
  const obtenerMotors = async () => {
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

  /* OBTENER UNA MOTOR */
  const obtenerMotor = async (motor) => {
    try {
      let motorEncontrada = null;
      if (motor !== null) {
        const resultado = await callEndpoint(getByID(urlApi, motor.id));
        if (resultado && resultado.data) {
          motorEncontrada = resultado.data;
        }
      } else {
        motorEncontrada = motor;
      }

      dispatch({
        type: OBTENER,
        payload: motorEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR MOTOR */
  const registrarMotor = async (motor) => {
    try {
      const resultado = await callEndpoint(postObject(`${urlApi}`, motor));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Motor creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el motor. ${error}`);
    }
  };

  /* ACTUALIZAR MOTOR */
  const actualizarMotor = async (motor) => {
    try {
      const resultado = await callEndpoint(putObject(`${urlApi}`, motor));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Motor actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el motor. ${error}`);
    }
  };

  /* ELIMINAR MOTOR */
  const eliminarMotor = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Motor eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el motor. ${error}`);
    }
  };

  return (
    <MotorContext.Provider
      value={{
        motorList: state.motorList,
        motorActual: state.motorActual,

        obtenerMotors,
        obtenerMotor,
        registrarMotor,
        actualizarMotor,
        eliminarMotor,
      }}>
      {props.children}
    </MotorContext.Provider>
  );
};
