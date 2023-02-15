import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const tipoadmisionReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        tipoadmisionList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        tipoadmisionList: [...state.tipoadmisionList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        tipoadmisionActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        tipoadmisionList: state.tipoadmisionList.map((tipoadmision) =>
          tipoadmision.id === action.payload.id ? action.payload : tipoadmision
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        tipoadmisionList: state.tipoadmisionList.filter((tipoadmision) => tipoadmision.id !== action.payload),
      };
    default:
      return state;
  }
};

export default tipoadmisionReducer;
