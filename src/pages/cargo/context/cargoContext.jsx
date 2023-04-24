import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
//import { getCargoList, getCargo, postCargo, putCargo, deleteCargo } from 'services/cargoService';
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import cargoReducer from "../reducer/cargoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const CargoContext = createContext();

export const CargoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "cargo";

  const initialState = {
    cargoList: [],
    cargoActual: null,
  };

  const [state, dispatch] = useReducer(cargoReducer, initialState);

  /* OBETENER LISTADO DE CARGOS */
  const obtenerCargos = async () => {
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

  /* OBTENER UN CARGO */
  const obtenerCargo = async (cargo) => {
    try {
      let cargoEncontrado = null;
      if (cargo !== null) {
        const resultado = await callEndpoint(getByID(urlApi, cargo.id));
        if (resultado && resultado.data) {
          cargoEncontrado = resultado.data;
        }
      } else {
        cargoEncontrado = cargo;
      }

      dispatch({
        type: OBTENER,
        payload: cargoEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR CARGO */
  const registrarCargo = async (cargo) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, cargo));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Cargo creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar crear el cargo. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR CARGO */
  const actualizarCargo = async (cargo) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, cargo));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Cargo actualizado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar actualizar el cargo. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR CARGO */
  const eliminarCargo = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Cargo eliminado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar eliminar el cargo. ${error}` })
      );
    }
  };

  return (
    <CargoContext.Provider
      value={{
        cargoList: state.cargoList,
        cargoActual: state.cargoActual,

        obtenerCargos,
        obtenerCargo,
        registrarCargo,
        actualizarCargo,
        eliminarCargo,
      }}>
      {props.children}
    </CargoContext.Provider>
  );
};
