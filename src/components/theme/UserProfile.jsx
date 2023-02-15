import React, { useContext } from "react";
import { MdOutlineCancel, MdLogout } from "react-icons/md";
import { Button } from "..";
import { useStateContext } from "contexts/ContextProvider";
import { LoginContext } from "contexts/LoginContext";
import { LogOut } from "utilities/Login_utiles";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { usuarioLogeado, setLogeado } = useContext(LoginContext);

  const handleLogOut = (e) => {
    e.preventDefault();
    setLogeado(false);
    LogOut();
    //window.location.href = "/";
  };

  return (
    <div className="nav-item w-screen fixed md:absolute md:w-96 lg:absolute lg:w-96 right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Perfil de Usuaurio
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-10 w-10"
          src="img/users/d2.jpg"
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-lg dark:text-gray-200">
            {/*usuarioLogeado.nombres + " " + usuarioLogeado.apellidos*/}
            {usuarioLogeado.nombres}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {usuarioLogeado.cargo.nombre}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400 text-justify">
            {usuarioLogeado.correo}
          </p>
        </div>
      </div>
      <div className="mt-5 text-center">
        <button
          type="button"
          onClick={handleLogOut}
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          className={`gap-5 text-lg p-3 w-full hover:drop-shadow-xl text-center inline-flex items-center`}>
          <MdLogout />
          <span className="capitalize">Salir</span>
        </button>
        {/*<Link to="#" onClick={handleLogOut}>
          <Button color="white" bgColor={currentColor} icon={ <MdLogout />} text={<span className="capitalize">Salir</span>} size='lg' borderRadius="10px" width="full"/>
        </Link>*/}
      </div>
    </div>
  );
};

export default UserProfile;
