import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS } from "const/actionTypes";

const vistasReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        vistasList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        vistasList: [...state.vistasList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        vistasActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        vistasList: state.vistasList.map((vistas) => (vistas.id === action.payload.id ? action.payload : vistas)),
      };
    case ELIMINAR:
      return {
        ...state,
        vistasList: state.vistasList.filter((vistas) => vistas.id !== action.payload),
      };
    case OBTENER_LISTA_ACTIVAS:
      return {
        ...state,
        vistasGroupList: action.payload,
      };
    default:
      return state;
  }
};
export default vistasReducer;
