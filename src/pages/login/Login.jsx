import { useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "authConfig";
import { LoginContext } from "contexts/LoginContext";
import { Alerts } from "components";
import LoadPage from "../utiles/LoadPage";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import logo from "assets/img/DBM2.0.png";

const Login = () => {
  const { instance } = useMsal();
  const { mensajeErr, mensajeOk } = useContext(LoginContext);
  const { loading, setLoading } = useFetchAndLoad();

  function handleLogin(e, instance) {
    e.preventDefault();
    setLoading(true);
    instance.loginRedirect(loginRequest).catch((err) => {
      console.error(err);
    });
  }

  return (
    <>
      <div className="bg-black">
        <section
          className="opacity-95 h-full gradient-form md:h-screen bg-center"
          style={{
            background: "url(img/banner-2.png)",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="py-12 px-6 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div className="xl:w-10/12">
                <div className="block bg-black bg-opacity-50 shadow-lg rounded-lg">
                  <div className="lg:flex lg:flex-wrap g-0">
                    {window.location.search === "?forbiden" ? (
                      <Alerts type="danger">
                        Sesión terminada, favor volver a iniciar sesión.
                      </Alerts>
                    ) : null}
                    {mensajeErr ? (
                      <Alerts type="danger">{mensajeErr}</Alerts>
                    ) : null}
                    {mensajeOk ? (
                      <Alerts type="success">{mensajeOk}</Alerts>
                    ) : null}

                    <div className="lg:w-6/12 px-4 md:px-0 bg-transparent text-white lg:rounded-l-lg">
                      <div className="md:p-12 md:mx-6">
                        <div className="mb-10 text-center">
                          <img
                            className="mx-auto w-full"
                            src={logo}
                            alt="logo"
                            height="200px"
                          />
                        </div>
                        <form>
                          <p className=" mb-10 text-center">
                            Ingresa con tu cuenta corporativa
                          </p>
                          <div className="mb-10 text-center">
                            <button
                              type="button"
                              onClick={(e) => handleLogin(e, instance)}>
                              <img
                                className="w-72"
                                src="/img/logo/microsoft_1.png"
                                alt="login microsoft"
                              />
                            </button>
                          </div>
                        </form>
                        <div className="mb-10 flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                          <p className="text-center font-semibold mx-4 mb-0">
                            DBM 2.0 © - 2022
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                      <div className="text-black px-4 py-6 md:p-12 md:mx-6">
                        <img
                          className="w-96"
                          alt="QSK-78"
                          src="img/qsk78.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loading ? <LoadPage /> : ""}
      </div>
    </>
  );
};

export default Login;
