import { useEffect, useContext } from "react";
import "./assets/css/App.css";
import { Login } from "./pages";
import { LoginContext } from "./contexts/LoginContext";
import { SelectsContextProvider } from "./contexts/SelectsContext";
import { createUserAdapter } from "./adapters";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { LogOut, getUsuarioPersist } from "./utilities/Login_utiles";
import useLogin from "./hooks/useLogin";
import Layout from "./pages/layout/Layout";

const Aplicacion = () => {
  const { accounts } = useMsal();
  const { JWT } = useLogin();
  const { logeado, crearUsuario, setLogeado } = useContext(LoginContext);

  useEffect(() => {
    try {
      const usuarioLog = getUsuarioPersist();

      if (usuarioLog === null) {
        if (accounts[0] && accounts[0].username && !logeado) {
          JWT(accounts[0].username).then((res) => !res && LogOut());
        }
      } else {
        if (accounts[0] && accounts[0].username) {
          setLogeado(true);
          crearUsuario(createUserAdapter(usuarioLog));
        } else {
          LogOut();
        }
      }
    } catch (e) {
      console.log(e);
      LogOut();
    }

    //obtenerLugaresTrabajo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts[0]]);

  return logeado && <Layout />;
};

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <SelectsContextProvider>
          <Aplicacion />
        </SelectsContextProvider>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  );
};

function App() {
  return <MainContent />;
}

export default App;
