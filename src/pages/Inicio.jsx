import { Button } from "components";
import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";

const Inicio = () => {
  const { currentColor } = useStateContext();

  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: "39,354",
      percentage: "-4%",
      title: "Usuarios",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <BsBoxSeam />,
      amount: "4,396",
      percentage: "+23%",
      title: "Productos",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <FiBarChart />,
      amount: "423,39",
      percentage: "+38%",
      title: "Ventas",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
    {
      icon: <HiOutlineRefresh />,
      amount: "39,354",
      percentage: "-12%",
      title: "Garantías",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
  ];

  return (
    <div className="mt-5">
      <div className="flex flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-50 rounded-xl w-full p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Ganancias</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4">
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            <Button color="white" bgColor={currentColor} text="Download" borderRadius="10px" />
          </div>
        </div>

        <div className=" rounded-2xl md:w-400 p-4 m-3 h-50" style={{ backgroundColor: currentColor }}>
          <div className="flex justify-between items-center ">
            <p className="font-semibold text-white text-2xl">Motores con TBO</p>

            <div>
              <p className="text-2xl text-white font-semibold mt-8">36</p>
              <p className="text-gray-200">A futuro</p>
            </div>
          </div>

          <div className="mt-4"></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg w-72  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl">
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
