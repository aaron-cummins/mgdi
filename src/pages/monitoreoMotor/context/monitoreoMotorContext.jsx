import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import monitoreoMotorReducer from "../reducer/monitoreoMotorReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const MonitoreoMotorContext = createContext();

export const MonitoreoMotorContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "monitoreomotor";

  const initialState = {
    monitoreomotorList: [],
    monitoreomotorActual: null,
  };

  const [state, dispatch] = useReducer(monitoreoMotorReducer, initialState);

  /* OBETENER LISTADO DE MONITOREOMOTORS */
  const obtenerMonitoreoMotors = async () => {
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

  /* OBTENER UN MONITOREOMOTOR */
  const obtenerMonitoreoMotor = async (monitoreomotor) => {
    try {
      let monitoreomotorEncontrado = null;
      if (monitoreomotor !== null) {
        const resultado = await callEndpoint(getByID(urlApi, monitoreomotor.id));
        if (resultado && resultado.data) {
          monitoreomotorEncontrado = resultado.data;
        }
      } else {
        monitoreomotorEncontrado = monitoreomotor;
      }

      dispatch({
        type: OBTENER,
        payload: monitoreomotorEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR MONITOREOMOTOR */
  const registrarMonitoreoMotor = async (monitoreomotor) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, monitoreomotor));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Monitoreo Motor creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear el monitoreo motor. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR MONITOREOMOTOR */
  const actualizarMonitoreoMotor = async (monitoreomotor) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, monitoreomotor));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Monitoreo Motor actualizado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar el monitoreo motor. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR MONITOREOMOTOR */
  const eliminarMonitoreoMotor = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Monitoreo Motor eliminado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar el monitoreo motor. ${error}`,
        })
      );
    }
  };

  return (
    <MonitoreoMotorContext.Provider
      value={{
        monitoreomotorList: state.monitoreomotorList,
        monitoreomotorActual: state.monitoreomotorActual,

        obtenerMonitoreoMotors,
        obtenerMonitoreoMotor,
        registrarMonitoreoMotor,
        actualizarMonitoreoMotor,
        eliminarMonitoreoMotor,
      }}>
      {props.children}
    </MonitoreoMotorContext.Provider>
  );
};
