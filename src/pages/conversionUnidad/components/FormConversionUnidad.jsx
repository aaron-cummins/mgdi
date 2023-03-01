import { useState, useContext, useMemo, useEffect } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { ConversionUnidadContext } from "../context/ConversionUnidadContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormConversionUnidad = () => {
  const { obtenerConversionUnidad, ConversionUnidadActual, actualizarConversionUnidad, registrarConversionUnidad } =
    useContext(ConversionUnidadContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const { unidadesList, conversionFlotaList } = useContext(SelectsContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();

  const ConversionUnidadDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      conversionFlotasId: 0,
      conversionFlotas: {
        id: 0,
      },
      unidadId: 0,
      unidad: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [ConversionUnidad, setConversionUnidad] = useState(ConversionUnidadDefault);

  useEffect(() => {
    ConversionUnidadActual !== null
      ? setConversionUnidad(ConversionUnidadActual)
      : setConversionUnidad(ConversionUnidadDefault);
  }, [ConversionUnidadActual, ConversionUnidadDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", ConversionUnidad.nombre, "Nombre requerido")) valida = false;
    if (
      validarSelect(
        "conversionFlotasId",
        ConversionUnidad.conversionFlotas,
        "Debe seleccionar una conversión de flotas"
      )
    )
      valida = false;
    if (validarSelect("unidadId", ConversionUnidad.unidad, "Debe seleccionar una unidad")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setConversionUnidad({ ...ConversionUnidad, [name]: checked });
    else if (name === "conversionFlotasId")
      setConversionUnidad({ ...ConversionUnidad, conversionFlotas: { id: value }, [name]: value });
    else if (name === "unidadId") setConversionUnidad({ ...ConversionUnidad, unidad: { id: value }, [name]: value });
    else setConversionUnidad({ ...ConversionUnidad, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setConversionUnidad(ConversionUnidadDefault);
    obtenerConversionUnidad(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      ConversionUnidadActual !== null
        ? actualizarConversionUnidad(ConversionUnidadEnviar())
        : registrarConversionUnidad(ConversionUnidadEnviar());
      closeModal();
      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const ConversionUnidadEnviar = () => {
    let ConversionUnidadTmp = { ...ConversionUnidad };
    ConversionUnidadTmp.conversionFlotasId = ConversionUnidad.conversionFlotas.id;
    ConversionUnidadTmp.unidadId = ConversionUnidad.unidad.id;
    return ConversionUnidadTmp;
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
            value={ConversionUnidad.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6">
            <Checkbox
              id="activo"
              name="activo"
              onChangeFN={handleChange}
              checked={ConversionUnidad.activo}
              label="Activo"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <Select
            id="unidadId"
            name="unidadId"
            placeholder="unidad"
            value={ConversionUnidad.unidad?.id}
            onChange={handleChange}
            label="Unidad"
            list={unidadesList}
            required={true}
            error={error.unidadId}
          />
        </div>
        <div className="form-group mb-6">
          <Select
            id="conversionFlotasId"
            name="conversionFlotasId"
            placeholder="conversionFlotas"
            value={ConversionUnidad.conversionFlotas?.id}
            onChange={handleChange}
            label="Conversión flotas"
            list={conversionFlotaList}
            required={true}
            error={error.conversionFlotasId}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormConversionUnidad;
