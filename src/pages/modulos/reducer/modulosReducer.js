import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const modulosReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        modulosList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        modulosList: [...state.modulosList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        modulosActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        modulosList: state.modulosList.map((modulos) => (modulos.id === action.payload.id ? action.payload : modulos)),
      };
    case ELIMINAR:
      return {
        ...state,
        modulosList: state.modulosList.filter((modulos) => modulos.id !== action.payload),
      };
    default:
      return state;
  }
};
export default modulosReducer;
