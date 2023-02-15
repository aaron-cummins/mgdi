import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const cargoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        cargoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        cargoList: [...state.cargoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        cargoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        cargoList: state.cargoList.map((cargo) => (cargo.id === action.payload.id ? action.payload : cargo)),
      };
    case ELIMINAR:
      return {
        ...state,
        cargoList: state.cargoList.filter((cargo) => cargo.id !== action.payload),
      };
    default:
      return state;
  }
};
export default cargoReducer;
