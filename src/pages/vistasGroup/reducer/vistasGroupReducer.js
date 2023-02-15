import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS } from "const/actionTypes";

const vistasGroupReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        vistasgroupList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        vistasgroupList: [...state.vistasgroupList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        vistasgroupActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        vistasgroupList: state.vistasgroupList.map((vistasgroup) =>
          vistasgroup.id === action.payload.id ? action.payload : vistasgroup
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        vistasgroupList: state.vistasgroupList.filter((vistasgroup) => vistasgroup.id !== action.payload),
      };
    case OBTENER_LISTA_ACTIVAS:
      return {
        ...state,
        modulosList: action.payload,
      };
    default:
      return state;
  }
};
export default vistasGroupReducer;
