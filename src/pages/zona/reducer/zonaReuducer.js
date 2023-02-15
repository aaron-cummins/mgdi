import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const zonaReuducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        zonaList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        zonaList: [...state.zonaList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        zonaActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        zonaList: state.zonaList.map((zona) => (zona.id === action.payload.id ? action.payload : zona)),
      };
    case ELIMINAR:
      return {
        ...state,
        zonaList: state.zonaList.filter((zona) => zona.id !== action.payload),
      };
    default:
      return state;
  }
};
export default zonaReuducer;
