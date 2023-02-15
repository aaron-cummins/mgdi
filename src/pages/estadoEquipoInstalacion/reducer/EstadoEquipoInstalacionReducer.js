import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const EstadoEquipoInstalacionReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        EstadoEquipoInstalacionList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        EstadoEquipoInstalacionList: [...state.EstadoEquipoInstalacionList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        EstadoEquipoInstalacionActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        EstadoEquipoInstalacionList: state.EstadoEquipoInstalacionList.map((EstadoEquipoInstalacion) =>
          EstadoEquipoInstalacion.id === action.payload.id ? action.payload : EstadoEquipoInstalacion
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        EstadoEquipoInstalacionList: state.EstadoEquipoInstalacionList.filter(
          (EstadoEquipoInstalacion) => EstadoEquipoInstalacion.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default EstadoEquipoInstalacionReducer;
