import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const equipoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        equipoList: action.payload,
      };

    case REGISTRAR:
      return {
        ...state,
        equipoList: [...state.equipoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        equipoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        equipoList: state.equipoList.map((equipo) => (equipo.id === action.payload.id ? action.payload : equipo)),
      };
    case ELIMINAR:
      return {
        ...state,
        equipoList: state.equipoList.filter((equipo) => equipo.id !== action.payload),
      };
    default:
      return state;
  }
};
export default equipoReducer;
