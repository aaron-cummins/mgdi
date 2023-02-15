import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const moduloControlReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        modulocontrolList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        modulocontrolList: [...state.modulocontrolList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        modulocontrolActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        modulocontrolList: state.modulocontrolList.map((modulocontrol) =>
          modulocontrol.id === action.payload.id ? action.payload : modulocontrol
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        modulocontrolList: state.modulocontrolList.filter((modulocontrol) => modulocontrol.id !== action.payload),
      };
    default:
      return state;
  }
};
export default moduloControlReducer;
