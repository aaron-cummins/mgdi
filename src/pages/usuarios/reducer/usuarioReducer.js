import {
  OBTENER_LISTA,
  REGISTRAR,
  OBTENER,
  ACTUALIZAR,
  ELIMINAR,
  REGISTRAR_OTRO,
  ELIMINAR_OTRO,
  OBTENER_LISTA_OTROS,
} from "const/actionTypes";

const usuarioReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        usuarioList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        usuarioList: [...state.usuarioList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        usuarioActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        usuarioList: state.usuarioList.map((usuario) => (usuario.id === action.payload.id ? action.payload : usuario)),
      };
    case ELIMINAR:
      return {
        ...state,
        usuarioList: state.usuarioList.filter((usuario) => usuario.id !== action.payload),
      };

    case REGISTRAR_OTRO:
      return {
        ...state,
        usuarioPermisosList: [...state.usuarioPermisosList, action.payload],
      };

    case OBTENER_LISTA_OTROS:
      return {
        ...state,
        usuarioPermisosList: action.payload,
      };
    case ELIMINAR_OTRO:
      return {
        ...state,
        usuarioPermisosList: state.usuarioPermisosList.filter((usuario) => usuario.id !== action.payload),
      };
    default:
      return state;
  }
};

export default usuarioReducer;
