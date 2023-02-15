import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const aplicacionOemReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        aplicacionOemList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        aplicacionOemList: [...state.aplicacionOemList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        aplicacionOemActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        aplicacionOemList: state.aplicacionOemList.map((aplicacionOem) =>
          aplicacionOem.id === action.payload.id ? action.payload : aplicacionOem
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        aplicacionOemList: state.aplicacionOemList.filter((aplicacionOem) => aplicacionOem.id !== action.payload),
      };
    default:
      return state;
  }
};
export default aplicacionOemReducer;
