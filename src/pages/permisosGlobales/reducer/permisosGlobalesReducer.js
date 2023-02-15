import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const permisosGlobalesReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        permisoGlobalList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        permisoGlobalList: action.payload,
      };
    case OBTENER:
      return {
        ...state,
        permisoGlobalActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        permisoGlobalList: state.permisoGlobalList.map((permisoGlobal) =>
          permisoGlobal.id === action.payload.id ? action.payload : permisoGlobal
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        permisoGlobalList: state.permisoGlobalList.filter((permisoGlobal) => permisoGlobal.id !== action.payload),
      };
    default:
      return state;
  }
};
export default permisosGlobalesReducer;
