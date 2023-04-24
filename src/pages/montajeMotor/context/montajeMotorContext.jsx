import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import montajeMotorReducer from "../reducer/montajeMotorReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const MontajeMotorContext = createContext();

export const MontajeMotorContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "montajemotor";

  const initialState = {
    montajemotorList: [],
    montajemotorActual: null,
  };

  const [state, dispatch] = useReducer(montajeMotorReducer, initialState);

  /* OBETENER LISTADO DE MONTAJEMOTORS */
  const obtenerMontajeMotorlist = async () => {
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

  /* OBTENER UNA MONTAJEMOTOR */
  const obtenerMontajeMotor = async (montajemotor) => {
    try {
      let montajemotorEncontrada = null;
      if (montajemotor !== null) {
        const resultado = await callEndpoint(getByID(urlApi, montajemotor.id));
        if (resultado && resultado.data) {
          montajemotorEncontrada = resultado.data;
        }
      } else {
        montajemotorEncontrada = montajemotor;
      }

      dispatch({
        type: OBTENER,
        payload: montajemotorEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR MONTAJEMOTOR */
  const registrarMontajeMotor = async (montajemotor) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, montajemotor));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Rol creado con exito!"}));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) => resolve({ tipoAlerta: "error",  mensaje: `'Ocurrió un error al intentar crear el Rol. ${error}`}));
    }
  };

  /* ACTUALIZAR MONTAJEMOTOR */
  const actualizarMontajeMotor = async (montajemotor) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, montajemotor));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Rol actualizado con exito!"}));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) => resolve({ tipoAlerta: "error",  mensaje: `'Ocurrió un error al intentar actualizar el Rol. ${error}`}));
    }
  };

  /* ELIMINAR MONTAJEMOTOR */
  const eliminarMontajeMotor = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: ((resolve) => resolve({ tipoAlerta: "success", mensaje: ((resolve) => resolve({ tipoAlerta: "success", mensaje: "Rol eliminado con exito!"}));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) => resolve({ tipoAlerta: "error",  mensaje: `'Ocurrió un error al intentar eliminar el Rol. ${error}`}));
    }
  };

  return (
    <MontajeMotorContext.Provider
      value={{
        montajemotorList: state.montajemotorList,
        montajemotorActual: state.montajemotorActual,

        obtenerMontajeMotorlist,
        obtenerMontajeMotor,
        registrarMontajeMotor,
        actualizarMontajeMotor,
        eliminarMontajeMotor,
      }}>
      {props.children}
    </MontajeMotorContext.Provider>
  );
};
