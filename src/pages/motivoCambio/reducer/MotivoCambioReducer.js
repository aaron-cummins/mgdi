import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const MotivoCambioReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        MotivoCambioList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        MotivoCambioList: [...state.MotivoCambioList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        MotivoCambioActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        MotivoCambioList: state.MotivoCambioList.map((MotivoCambio) =>
          MotivoCambio.id === action.payload.id ? action.payload : MotivoCambio
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        MotivoCambioList: state.MotivoCambioList.filter((MotivoCambio) => MotivoCambio.id !== action.payload),
      };
    default:
      return state;
  }
};
export default MotivoCambioReducer;
