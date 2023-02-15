import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const unidadReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        unidadList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        unidadList: [...state.unidadList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        unidadActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        unidadList: state.unidadList.map((unidad) => (unidad.id === action.payload.id ? action.payload : unidad)),
      };
    case ELIMINAR:
      return {
        ...state,
        unidadList: state.unidadList.filter((unidad) => unidad.id !== action.payload),
      };
    default:
      return state;
  }
};

export default unidadReducer;
