import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from "..";
import { useStateContext } from "contexts/ContextProvider";

const Notification = () => {
  const { currentColor } = useStateContext();
  const chatData = [
    {
      image: "img/users/d3.jpg",
      message: "Bienvenido!",
      desc: "Sistema de Mantenimiento Distribuidora Cummins Chile",
      time: "9:08 AM",
    },
  ];
  return (
    <div className="nav-item w-screen fixed right-1 md:absolute md:w-96 md:right-5 lg:absolute lg:w-96 lg:right-5 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg  shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Notificaciones</p>
          <button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange-theme ">
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        {chatData?.map((item, index) => (
          <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
            <img className="rounded-full h-10 w-10" src={item.image} alt={item.message} />
            <div>
              <p className="font-semibold dark:text-gray-200">{item.message}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Ver todas las notificaciones"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
