import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const tipoinyeccionReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        tipoinyeccionList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        tipoinyeccionList: [...state.tipoinyeccionList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        tipoinyeccionActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        tipoinyeccionList: state.tipoinyeccionList.map((tipoinyeccion) =>
          tipoinyeccion.id === action.payload.id ? action.payload : tipoinyeccion
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        tipoinyeccionList: state.tipoinyeccionList.filter((tipoinyeccion) => tipoinyeccion.id !== action.payload),
      };
    default:
      return state;
  }
};

export default tipoinyeccionReducer;
