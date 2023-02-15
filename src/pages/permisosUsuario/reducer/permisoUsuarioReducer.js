import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS } from "const/actionTypes";

const permisoUsuarioReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        permisoUsuarioList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        permisoUsuarioList: [...state.permisoUsuarioList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        permisoUsuarioActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        permisoUsuarioList: state.permisoUsuarioList.map((permisoUsuario) =>
          permisoUsuario.id === action.payload.id ? action.payload : permisoUsuario
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        permisoUsuarioList: state.permisoUsuarioList.filter((permisoUsuario) => permisoUsuario.id !== action.payload),
      };
    case OBTENER_LISTA_ACTIVAS:
      return {
        ...state,
        regionListActiva: action.payload,
      };
    default:
      return state;
  }
};
export default permisoUsuarioReducer;
