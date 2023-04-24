import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { RolesContext } from "../context/rolesContext";
import { formatDate } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormRoles = ({ closeModal }) => {
  const { registrarRoles, rolesActual, actualizarRoles, obtenerRoles } = useContext(RolesContext);
  const { enqueueSnackbar } = useSnackbar();
  const { validarTexto, validarNumero, error, setError } = useValidacionForm();

  const rolesDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      permisosGlobales: [],
      created_at: formatDate(Date(Date.now)),
      updated_at: formatDate(Date(Date.now)),
      activo: false,
    };
  }, []);

  const [roles, setRoles] = useState(rolesDefault);

  useEffect(() => {
    rolesActual ? setRoles(rolesActual) : setRoles(rolesDefault);
  }, [rolesActual, rolesDefault]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("nombre", roles.nombre, "Nombre de rol requerido")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setRoles({ ...roles, [name]: checked });
    else setRoles({ ...roles, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setRoles(rolesDefault);
    obtenerRoles(null);
    setError({});
    closeModal();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      rolesActual !== null
        ? actualizarRoles(RolesAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }))
        : registrarRoles(RolesAEnviar()).then((res) => enqueueSnackbar(res.mensaje, { variant: res.tipoAlerta }));

      limpiaForm();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const RolesAEnviar = () => {
    let rolesTmp = { ...roles };
    rolesTmp.permisosGlobales && delete rolesTmp.permisosGlobales;
    rolesTmp.permisosGlobales = [];
    rolesTmp.updated_at = formatDate(Date(Date.now));
    return rolesTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre rol"
            value={roles.nombre}
            onChangeFN={handleChange}
            required={true}
            error={error.nombre}
          />
        </div>
        <div className="form-group form-check mb-6 items-center">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={roles.activo} />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormRoles;
