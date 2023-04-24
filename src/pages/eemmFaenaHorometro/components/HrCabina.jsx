import React, { useEffect, useState } from "react";
import { diasEnUnMes } from "utilities/Utiles";

const HrCabina = ({ unidades }) => {
  const [columns, setColumns] = useState([]);

  const getColumnas = () => {
    const fecha = new Date();
    const dias = [];
    for (let index = 1; index <= diasEnUnMes(fecha.getMonth() + 1, fecha.getFullYear()); index++) {
      dias.push({
        id: index,
        col: <input type="text" name={index} id={index} value={0} onChange={() => {}} className="w-8" />,
      });
    }
    setColumns(dias);
  };

  useEffect(() => {
    getColumnas();
    console.log(1 % 2, 2 % 2, 3 % 2);
  }, [unidades]);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 pl-2 border">
        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center" key={"titulo"}>
            <td>Flota</td>
            <td>Nombre</td>
            <td>Hr. Cabina ter. mes</td>
            <td>Hr. Motor ter. mes</td>
            {columns.map((item) => (
              <td className="border w-8" key={`${item.id}rl`}>
                {item.id}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {unidades.map((item) => (
            <tr className={`text-center hover:bg-neutral-200`} key={`${item.id}_unidad`}>
              <td>{item.flotaLugarTrabajo.flotas.nombre}</td>
              <td>{item.nombre}</td>
              <td></td>
              <td></td>
              {columns.map((input) => (
                <td className="border" key={`${input.id}rl`}>
                  <input
                    type="text"
                    name={`${item.id}_${input.id}`}
                    id={input.id}
                    value={0}
                    onChange={() => {}}
                    className="w-8"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HrCabina;
