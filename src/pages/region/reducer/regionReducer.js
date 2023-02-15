import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const regionReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        regionList: action.payload,
      };

    case REGISTRAR:
      return {
        ...state,
        regionList: [...state.regionList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        regionActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        regionList: state.regionList.map((region) => (region.id === action.payload.id ? action.payload : region)),
      };
    case ELIMINAR:
      return {
        ...state,
        regionList: state.regionList.filter((region) => region.id !== action.payload),
      };
    default:
      return state;
  }
};
export default regionReducer;
