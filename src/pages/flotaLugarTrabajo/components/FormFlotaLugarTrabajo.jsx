import React, { useEffect, useState, useContext, useMemo } from "react";
import { Buttons, Checkbox, Select } from "components";
import { FlotaLugarTrabajoContext } from "../context/flotaLugarTrabajoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { SelectsContext } from "contexts/SelectsContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormFlotaLugarTrabajo = () => {
  const { registrarFlotaLugarTrabajo, flotaLugarTrabajoActual, actualizarFlotaLugarTrabajo, obtenerFlotaLugarTrabajo } =
    useContext(FlotaLugarTrabajoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const {
    flotasList,
    lugarTrabajoList,
  } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const flotaLugarTrabajoDefault = useMemo(
    () => ({
      id: 0,
      flotasId: 0,
      flotas: {
        id: 0,
      },
      lugarTrabajoId: 0,
      lugarTrabajo: {
        id: 0,
      },
      activo: false,
    }),
    []
  );

  const [flotaLugarTrabajo, setFlotaLugarTrabajo] = useState(flotaLugarTrabajoDefault);

  useEffect(() => {
    flotaLugarTrabajoActual !== null
      ? setFlotaLugarTrabajo(flotaLugarTrabajoActual)
      : setFlotaLugarTrabajo(flotaLugarTrabajoDefault);
  }, [flotaLugarTrabajoActual, flotaLugarTrabajoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarSelect("flotasId", flotaLugarTrabajo.flotas, "Debe seleccionar una flota")) valida = false;
    if (validarSelect("lugarTrabajoId", flotaLugarTrabajo.lugarTrabajo, "Debe seleccionar un lugar de trabajo")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setFlotaLugarTrabajo({ ...flotaLugarTrabajo, [name]: checked });
    else if (name === "flotasId") setFlotaLugarTrabajo({ ...flotaLugarTrabajo, flotas: { id: value }, [name]: value  });
    else if (name === "lugarTrabajoId") setFlotaLugarTrabajo({ ...flotaLugarTrabajo, lugarTrabajo: { id: value }, [name]: value  });
    else setFlotaLugarTrabajo({ ...flotaLugarTrabajo, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setFlotaLugarTrabajo(flotaLugarTrabajoDefault);
    obtenerFlotaLugarTrabajo(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      flotaLugarTrabajoActual !== null
        ? actualizarFlotaLugarTrabajo(FlotaEnviar())
        : registrarFlotaLugarTrabajo(FlotaEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const FlotaEnviar = () => {
    let flotaTmp = { ...flotaLugarTrabajo };
    flotaTmp.lugarTrabajoId = flotaLugarTrabajo.lugarTrabajo.id; 
    flotaTmp.flotasId =flotaLugarTrabajo.flotas.id;
    return flotaTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        
        <div className="form-group mb-4">
          <Select
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            value={flotaLugarTrabajo.lugarTrabajo.id}
            onChange={handleChange}
            label="Lugar trabajo"
            list={lugarTrabajoList}
            required={true}
            error={error.lugarTrabajoId}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="flotasId"
            name="flotasId"
            placeholder="Flota"
            value={flotaLugarTrabajo.flotas.id}
            onChange={handleChange}
            label="Flota"
            list={flotasList}
            required={true}
            error={error.flotasId}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox
          id="activo"
          name="activo"
          label="Activo"
          onChangeFN={handleChange}
          checked={flotaLugarTrabajo.activo}  
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormFlotaLugarTrabajo;
