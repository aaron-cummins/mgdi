import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { ComunaContext } from "../context/comunaContext";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormComuna = ({ closeModal }) => {
  const { registrarComuna, comunaActual, actualizarComuna, obtenerComuna } = useContext(ComunaContext);

  const { enqueueSnackbar } = useSnackbar();
  const { regionList } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const comunaDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      regionId: 0,
      region: {
        id: 0,
      },
      activo: false,
    }),
    []
  );

  const [comuna, setComuna] = useState(comunaDefault);

  useEffect(() => {
    comunaActual !== null ? setComuna(comunaActual) : setComuna(comunaDefault);
  }, [comunaActual, comunaDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", comuna.nombre, "Nombre de comuna requerido")) valida = false;
    if (validarSelect("regionId", comuna.region, "Debe seleccionar una región")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setComuna({ ...comuna, [name]: checked });
    else if (name === "regionId") setComuna({ ...comuna, region: { id: value }, [name]: value });
    else setComuna({ ...comuna, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setComuna(comunaDefault);
    obtenerComuna(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      comunaActual !== null
        ? actualizarComuna(ComunaAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }))
        : registrarComuna(ComunaAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }));
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const ComunaAEnviar = () => {
    let comunaTmp = { ...comuna };
    comunaTmp.regionId = comuna.region.id;
    return comunaTmp;
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
            value={comuna.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group">
          <Select
            id="regionId"
            name="regionId"
            Label="Región"
            value={comuna.region?.id}
            onChange={handleChange}
            label="Región"
            list={regionList}
            required={true}
            error={error.regionId}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={comuna.activo} />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormComuna;
