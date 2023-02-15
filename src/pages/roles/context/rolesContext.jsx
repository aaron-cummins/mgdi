import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import rolesReducer from "../reducer/rolesReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const RolesContext = createContext();

export const RolesContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "roles";

  const initialState = {
    rolesList: [],
    rolesActual: null,
  };

  const [state, dispatch] = useReducer(rolesReducer, initialState);

  /* OBETENER LISTADO DE ROLESS */
  const obtenerRoleslist = async () => {
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

  /* OBTENER UNA ROLES */
  const obtenerRoles = async (roles) => {
    try {
      let rolesEncontrada = null;
      if (roles !== null) {
        const resultado = await callEndpoint(getByID(urlApi, roles.id));
        if (resultado && resultado.data) {
          rolesEncontrada = resultado.data;
        }
      } else {
        rolesEncontrada = roles;
      }

      dispatch({
        type: OBTENER,
        payload: rolesEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR ROLES */
  const registrarRoles = async (roles) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, roles));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Rol creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Rol. ${error}`);
    }
  };

  /* ACTUALIZAR ROLES */
  const actualizarRoles = async (roles) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, roles));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Rol actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Rol. ${error}`);
    }
  };

  /* ELIMINAR ROLES */
  const eliminarRoles = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Rol eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Rol. ${error}`);
    }
  };

  return (
    <RolesContext.Provider
      value={{
        rolesList: state.rolesList,
        rolesActual: state.rolesActual,

        obtenerRoleslist,
        obtenerRoles,
        registrarRoles,
        actualizarRoles,
        eliminarRoles,
      }}>
      {props.children}
    </RolesContext.Provider>
  );
};
