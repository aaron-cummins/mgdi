import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const EstadoEquipoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        EstadoEquipoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        EstadoEquipoList: [...state.EstadoEquipoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        EstadoEquipoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        EstadoEquipoList: state.EstadoEquipoList.map((EstadoEquipo) =>
          EstadoEquipo.id === action.payload.id ? action.payload : EstadoEquipo
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        EstadoEquipoList: state.EstadoEquipoList.filter((EstadoEquipo) => EstadoEquipo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default EstadoEquipoReducer;
