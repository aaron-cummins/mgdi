import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const oemReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        oemList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        oemList: [...state.oemList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        oemActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        oemList: state.oemList.map((oem) => (oem.id === action.payload.id ? action.payload : oem)),
      };
    case ELIMINAR:
      return {
        ...state,
        oemList: state.oemList.filter((oem) => oem.id !== action.payload),
      };
    default:
      return state;
  }
};

export default oemReducer;
