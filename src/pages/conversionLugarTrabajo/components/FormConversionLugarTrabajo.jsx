import { useState, useContext, useMemo, useEffect } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { ConversionLugarTrabajoContext } from "../context/ConversionLugarTrabajoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormConversionLugarTrabajo = () => {
  const {
    obtenerConversionLugarTrabajo,
    ConversionLugarTrabajoActual,
    actualizarConversionLugarTrabajo,
    registrarConversionLugarTrabajo,
  } = useContext(ConversionLugarTrabajoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const { lugarTrabajoList, fuenteInformacionList } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const ConversionLugarTrabajoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      fuenteInformacionId: 0, //funciona para enviar los datos al backend
      fuenteInformacion: {
        id: 0,
      },
      lugarTrabajoId: 0,
      lugarTrabajo: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [ConversionLugarTrabajo, setConversionLugarTrabajo] = useState(ConversionLugarTrabajoDefault);

  useEffect(() => {
    ConversionLugarTrabajoActual !== null
      ? setConversionLugarTrabajo(ConversionLugarTrabajoActual)
      : setConversionLugarTrabajo(ConversionLugarTrabajoDefault);
  }, [ConversionLugarTrabajoActual, ConversionLugarTrabajoDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", ConversionLugarTrabajo.nombre, "Nombre requerido")) valida = false;
    if (validarTexto("abreviacion", ConversionLugarTrabajo.abreviacion, "Abreviacion requerida")) valida = false;
    if (
      validarSelect(
        "fuenteInformacionId",
        ConversionLugarTrabajo.fuenteInformacion,
        "Debe seleccionar una fuente de información"
      )
    )
      valida = false;
    if (
      validarSelect("lugarTrabajoId", ConversionLugarTrabajo.lugarTrabajo, "Debe seleccionar un tipo lugar de trabajo")
    )
      valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setConversionLugarTrabajo({ ...ConversionLugarTrabajo, [name]: checked });
    else if (name === "fuenteInformacionId")
      setConversionLugarTrabajo({ ...ConversionLugarTrabajo, fuenteInformacion: { id: value }, [name]: value });
    else if (name === "lugarTrabajoId")
      setConversionLugarTrabajo({ ...ConversionLugarTrabajo, lugarTrabajo: { id: value }, [name]: value });
    else setConversionLugarTrabajo({ ...ConversionLugarTrabajo, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setConversionLugarTrabajo(ConversionLugarTrabajoDefault);
    obtenerConversionLugarTrabajo(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      ConversionLugarTrabajoActual !== null
        ? actualizarConversionLugarTrabajo(ConversionLugarTrabajoEnviar())
        : registrarConversionLugarTrabajo(ConversionLugarTrabajoEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const ConversionLugarTrabajoEnviar = () => {
    let ConversionLugarTrabajoTmp = { ...ConversionLugarTrabajo };
    ConversionLugarTrabajoTmp.lugarTrabajoId = ConversionLugarTrabajo.lugarTrabajo.id;
    ConversionLugarTrabajoTmp.fuenteInformacionId = ConversionLugarTrabajo.fuenteInformacion.id;
    return ConversionLugarTrabajoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={ConversionLugarTrabajo.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group mb-3">
          <InputText
            id="abreviacion"
            name="abreviacion"
            placeholder="Abreviación"
            label="Abreviación"
            value={ConversionLugarTrabajo.abreviacion}
            onChangeFN={handleChange}
            required={true}
            error={error.abreviacion}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <Select
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="lugar Trabajo"
            value={ConversionLugarTrabajo.lugarTrabajo?.id}
            onChange={handleChange}
            label="Lugar trabajo"
            list={lugarTrabajoList}
            required={true}
            error={error.lugarTrabajoId}
          />
        </div>
        <div className="form-group mb-6">
          <Select
            id="fuenteInformacionId"
            name="fuenteInformacionId"
            placeholder="fuente de informacion"
            value={ConversionLugarTrabajo.fuenteInformacion?.id}
            onChange={handleChange}
            label="Fuente de información"
            list={fuenteInformacionList}
            required={true}
            error={error.fuenteInformacionId}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <Checkbox
            id="activo"
            name="activo"
            onChangeFN={handleChange}
            checked={ConversionLugarTrabajo.activo}
            label="Activo"
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormConversionLugarTrabajo;
