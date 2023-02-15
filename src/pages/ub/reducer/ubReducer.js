import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const ubReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        ubList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        ubList: [...state.ubList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        ubActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        ubList: state.ubList.map((ub) => (ub.id === action.payload.id ? action.payload : ub)),
      };
    case ELIMINAR:
      return {
        ...state,
        ubList: state.ubList.filter((ub) => ub.id !== action.payload),
      };
    default:
      return state;
  }
};
export default ubReducer;
