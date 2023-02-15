import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS } from "const/actionTypes";

const motorReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        motorList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        motorList: [...state.motorList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        motorActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        motorList: state.motorList.map((motor) => (motor.id === action.payload.id ? action.payload : motor)),
      };
    case ELIMINAR:
      return {
        ...state,
        motorList: state.motorList.filter((motor) => motor.id !== action.payload),
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
export default motorReducer;
