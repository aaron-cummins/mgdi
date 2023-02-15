import { useState, useContext, useMemo, useEffect } from "react";
import { InputText, Buttons, Checkbox, Select} from "components";
import { ConversionFlotasContext } from "../context/ConversionFlotasContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormConversionFlotas = () => {
  const { obtenerConversionFlotas, ConversionFlotasActual, actualizarConversionFlotas, registrarConversionFlotas } =
    useContext(ConversionFlotasContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const {
    flotasList,
    conversionLugarTrabajoList,
    fuenteInformacionList,
  } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const ConversionFlotasDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      flotasId: 0,
      flotas: {
        id: 0,
      },
      fuenteInformacionId: 0, //funciona para enviar los datos al backend
      fuenteInformacion: {
        id: 0,
      },
      conversionLugarTrabajoId: 0,
      conversionLugarTrabajo: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [ConversionFlotas, setConversionFlotas] = useState(ConversionFlotasDefault);

  useEffect(() => {
    ConversionFlotasActual !== null ? setConversionFlotas(ConversionFlotasActual) : setConversionFlotas(ConversionFlotasDefault);
  }, [ConversionFlotasActual, ConversionFlotasDefault]);
 
  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", ConversionFlotas.nombre, "Nombre conversión de flotas requerido")) valida = false;
    if (validarTexto("abreviacion", ConversionFlotas.abreviacion, "Abreviación de conversión de flotas requerida")) valida = false;
    if (validarSelect("flotasId", ConversionFlotas.flotas, "Debe seleccionar una flota")) valida = false;
    if (validarSelect("fuenteInformacionId", ConversionFlotas.fuenteInformacion, "Debe seleccionar una fuente de información")) valida = false;
    if (validarSelect("conversionLugarTrabajoId", ConversionFlotas.conversionLugarTrabajo, "Debe seleccionar una conversión lugar de trabajo")) valida = false;
  
    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setConversionFlotas({ ...ConversionFlotas, [name]: checked });
    else if (name === "flotasId") setConversionFlotas({ ...ConversionFlotas, flotas: { id: value }, [name]: value });
    else if (name === "fuenteInformacionId") setConversionFlotas({ ...ConversionFlotas, fuenteInformacion: { id: value }});
    else if (name === "conversionLugarTrabajoId") setConversionFlotas({ ...ConversionFlotas, conversionLugarTrabajo: { id: value }});
    else setConversionFlotas({ ...ConversionFlotas, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setConversionFlotas(ConversionFlotasDefault);
    obtenerConversionFlotas(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      ConversionFlotasActual !== null
        ? actualizarConversionFlotas(ConversionFlotasEnviar())
        : registrarConversionFlotas(ConversionFlotasEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const ConversionFlotasEnviar = () => {
    let ConversionFlotasTmp = { ...ConversionFlotas };
    ConversionFlotasTmp.flotasId = document.querySelector("#flotasId").value;
    ConversionFlotasTmp.fuenteInformacionId = document.querySelector("#fuenteInformacionId").value;
    ConversionFlotasTmp.conversionLugarTrabajoId = document.querySelector("#conversionLugarTrabajoId").value;
    return ConversionFlotasTmp;
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
            value={ConversionFlotas.nombre}
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
            value={ConversionFlotas.abreviacion}
            onChangeFN={handleChange}
            required={true}
            error={error.abreviacion}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <Select
            id="flotasId"
            name="flotasId"
            placeholder="flota"
            value={ConversionFlotas.flotas?.id}
            onChange={handleChange}
            label="Flota"
            list={flotasList}
            required={true}
            error={error.flotasId}
          />
        </div>
        <div className="form-group mb-6">
          <Select
            id="fuenteInformacionId"
            name="fuenteInformacionId"
            placeholder="fuente de informacion"
            value={ConversionFlotas.fuenteInformacion?.id}
            onChange={handleChange}
            label="Fuente informacion"
            list={fuenteInformacionList}
            required={true}
            error={error.fuenteInformacionId}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <Select
            id="conversionLugarTrabajoId"
            name="conversionLugarTrabajoId"
            placeholder="Conversión lugar de trabajo"
            value={ConversionFlotas.conversionLugarTrabajo?.id}
            onChange={handleChange}
            label="Conversión lugar trabajo"
            list={conversionLugarTrabajoList}
            required={true}
            error={error.conversionLugarTrabajoId}
          />
        </div>
        <div className="form-group mb-6">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={ConversionFlotas.activo} label="Activo" />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormConversionFlotas;
