import { createUserAdapter, loginAdapter } from "adapters";
import { login, obtenerUsuarioCorreo } from "services/usuarioService";
//import { useIsAuthenticated } from "@azure/msal-react";
import { LoginContext } from "contexts/LoginContext";
import { LogOut, persistUsuarioState, persistJwt } from "utilities/Login_utiles";
import useFetchAndLoad from "./useFetchAndLoad";

import { useContext } from "react";

const useLogin = () => {
  //const isAuthenticated = useIsAuthenticated();
  const { setLogeado, crearUsuario, setMensajeErr, setMensajeOk } = useContext(LoginContext);
  const { callEndpoint, setLoading } = useFetchAndLoad();

  const JWT = async (correo) => {
    const credenciales = loginAdapter(correo);
    const jwt = await callEndpoint(login(credenciales));

    console.log(jwt.data);

    let respuesta = false;

    if (jwt && jwt.data) {
      await persistJwt(jwt.data.access_token, jwt.data.refresh_token);

      const permisos = await callEndpoint(obtenerUsuarioCorreo(correo));

      if (permisos && permisos.data) {
        //await entrar(correo);
        const adapUser = createUserAdapter(jwt.data, permisos.data);
        crearUsuario(adapUser);
        persistUsuarioState(adapUser);

        setMensajeOk("Logeado con Exito!");
        setMensajeErr(null);
        setLogeado(true);

        respuesta = true;
      }
    } else {
      setMensajeErr("No se encontró el usuario (no se pudo recuperar el token), póngase en contacto con Soporte DBM");
      LogOut();
      //clearUsuarioState();
      setMensajeOk(null);
      setLogeado(false);

      respuesta = false;
    }

    setLoading(false);

    setTimeout(() => {
      setMensajeErr(null);
      setMensajeOk(null);
    }, 5000);

    return respuesta;
  };

  return { JWT };
};

export default useLogin;
