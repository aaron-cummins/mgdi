import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const rolesReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        rolesList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        rolesList: [...state.rolesList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        rolesActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        rolesList: state.rolesList.map((roles) => (roles.id === action.payload.id ? action.payload : roles)),
      };
    case ELIMINAR:
      return {
        ...state,
        rolesList: state.rolesList.filter((roles) => roles.id !== action.payload),
      };
    default:
      return state;
  }
};

export default rolesReducer;
