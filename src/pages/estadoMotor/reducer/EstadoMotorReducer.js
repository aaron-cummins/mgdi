import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const EstadoMotorReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        EstadoMotorList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        EstadoMotorList: [...state.EstadoMotorList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        EstadoMotorActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        EstadoMotorList: state.EstadoMotorList.map((EstadoMotor) =>
          EstadoMotor.id === action.payload.id ? action.payload : EstadoMotor
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        EstadoMotorList: state.EstadoMotorList.filter((EstadoMotor) => EstadoMotor.id !== action.payload),
      };
    default:
      return state;
  }
};

export default EstadoMotorReducer;
