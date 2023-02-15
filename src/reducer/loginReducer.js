import { OBTENER, OBTENER_MENU, OBTENER_ACCIONES } from "../const/actionTypes";

const loginReducer = (state, action) => {
  switch (action.type) {
    case OBTENER:
      return {
        ...state,
        usuarioLogeado: action.payload,
      };
    case OBTENER_MENU:
      return {
        ...state,
        menuUsuario: action.payload,
      };

    case OBTENER_ACCIONES:
      return {
        ...state,
        paginas: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
