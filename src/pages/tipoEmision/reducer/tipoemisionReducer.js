import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const tipoemisionReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        tipoemisionList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        tipoemisionList: [...state.tipoemisionList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        tipoemisionActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        tipoemisionList: state.tipoemisionList.map((tipoemision) =>
          tipoemision.id === action.payload.id ? action.payload : tipoemision
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        tipoemisionList: state.tipoemisionList.filter((tipoemision) => tipoemision.id !== action.payload),
      };
    default:
      return state;
  }
};
export default tipoemisionReducer;
