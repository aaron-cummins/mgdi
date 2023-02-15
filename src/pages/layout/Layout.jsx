import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings, Rutas } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { getUsuarioLugaresTrabajoList } from "utilities/Login_utiles";
//import LoadPage from "pages/utiles/LoadPage";

const Layout = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();
  const { obtenerLugaresTrabajo, obtenerLugaresTrabajoUsuario, lugarTrabajoList } = useContext(SelectsContext);

  useEffect(() => {
    obtenerLugaresTrabajo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let LTrabajoUser = getUsuarioLugaresTrabajoList();
    let lug_trabajos = [];

    if (lugarTrabajoList.length > 0) {
      LTrabajoUser.LugarTrabajo.forEach((item) => {
        lug_trabajos.push(
          lugarTrabajoList?.find((obj) => {
            return obj.id === item.lugar_trabajo_id ? obj : null;
          })
        );
      });
    }

    obtenerLugaresTrabajoUsuario([...new Set(lug_trabajos)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lugarTrabajoList]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: currentColor, borderRadius: "50%" }}
                onClick={() => setThemeSettings(true)}>
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* SIDEBARS */}
          {activeMenu ? (
            <div className="w-screen md:w-80 fixed sidebar dark:bg-secondary-dark-bg bg-secondary-dark-bg">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 md:w-16 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          {/* CONTENIDO */}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-80 ml-80" : "flex-1"
            }`}>
            {/* NAVBAR */}
            <div className="dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              {/* RUTAS */}
              <Rutas />
            </div>

            {/* FOOTER */}
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
