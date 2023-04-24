import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { CargoContext } from "../context/cargoContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormCargo = ({ closeModal }) => {
  const { registrarCargo, cargoActual, actualizarCargo, obtenerCargo } = useContext(CargoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const cargoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [cargo, setCargo] = useState(cargoDefault);

  useEffect(() => {
    cargoActual !== null ? setCargo(cargoActual) : setCargo(cargoDefault);
  }, [cargoActual, cargoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", cargo.nombre, "Nombre del cargo requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setCargo({ ...cargo, [name]: checked });
    else setCargo({ ...cargo, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setCargo(cargoDefault);
    obtenerCargo(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      cargoActual !== null
        ? actualizarCargo(CargoAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }))
        : registrarCargo(CargoAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }));
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const CargoAEnviar = () => {
    let cargoTmp = { ...cargo };
    return cargoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={cargo.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={cargo.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormCargo;
