import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const monitoreoFiltroReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        monitoreofiltroList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        monitoreofiltroList: [...state.monitoreofiltroList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        monitoreofiltroActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        monitoreofiltroList: state.monitoreofiltroList.map((monitoreofiltro) =>
          monitoreofiltro.id === action.payload.id ? action.payload : monitoreofiltro
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        monitoreofiltroList: state.monitoreofiltroList.filter(
          (monitoreofiltro) => monitoreofiltro.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default monitoreoFiltroReducer;
