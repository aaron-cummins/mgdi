import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const monitoreoMotorReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        monitoreomotorList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        monitoreomotorList: [...state.monitoreomotorList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        monitoreomotorActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        monitoreomotorList: state.monitoreomotorList.map((monitoreomotor) =>
          monitoreomotor.id === action.payload.id ? action.payload : monitoreomotor
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        monitoreomotorList: state.monitoreomotorList.filter((monitoreomotor) => monitoreomotor.id !== action.payload),
      };
    default:
      return state;
  }
};
export default monitoreoMotorReducer;
