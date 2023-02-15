import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const EstadoMotorInstalacionReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        EstadoMotorInstalacionList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        EstadoMotorInstalacionList: [...state.EstadoMotorInstalacionList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        EstadoMotorInstalacionActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        EstadoMotorInstalacionList: state.EstadoMotorInstalacionList.map((EstadoMotorInstalacion) =>
          EstadoMotorInstalacion.id === action.payload.id ? action.payload : EstadoMotorInstalacion
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        EstadoMotorInstalacionList: state.EstadoMotorInstalacionList.filter(
          (EstadoMotorInstalacion) => EstadoMotorInstalacion.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default EstadoMotorInstalacionReducer;
