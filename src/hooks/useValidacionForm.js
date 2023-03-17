import { useState } from "react";

const useValidacionForm = () => {
  const [error, setError] = useState([]);

  const validarTexto = (campo, valor, mensaje) => {
    if (!valor || !valor.trim()) {
      addError(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const validarNumero = (campo, valor, mensaje) => {
    if (!valor || valor === 0 || isNaN(valor)) {
      addError(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const validarSelect = (campo, valor, mensaje) => {
    if (!valor || parseInt(valor.id) === 0 || isNaN(valor.id)) {
      addError(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const validarMail = (campo, valor, mensaje) => {
    let exprReg =
      /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
    let resultadoMail = exprReg.test(valor);

    if (!resultadoMail) {
      addErrorUsuario(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const validarTelefono = (campo, valor, mensaje) => {
    let ExpresionRegularTelefono = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;
    let resultadoTelefono = ExpresionRegularTelefono.test(valor);

    if (!resultadoTelefono) {
      addErrorUsuario(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const validarUId = (campo, valor, mensaje) => {
    let ExpresionRegularUId = /^[Uu]+[0-9]{7,8}$/;
    let resultadoUId = ExpresionRegularUId.test(valor);

    if (!resultadoUId) {
      addErrorUsuario(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  // Realiza el cálculo del rut
  let Fn = {
    validaRut: function (rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
      var tmp = rutCompleto.split("-");
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv === "K") digv = "k";
      return Fn.dv(rut).toString() === digv.toString();
    },
    dv: function (T) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    },
  };

  // Verifica si el rut es valido o invalido
  const validacionRut = (campo, valor, mensaje) => {
    if (!Fn.validaRut(valor)) {
      addErrorUsuario(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const removerError = (campo) => {
    setError((current) => {
      const copia = { ...current };
      delete copia[campo];
      return copia;
    });
  };

  const addError = (campo, value, mensaje) => {
    setError((current) => {
      const copia = { ...current };
      copia[campo] = mensaje ? mensaje : value ? value : "Campo requerido";
      return copia;
    });
  };

  const addErrorUsuario = (campo, value, mensaje) => {
    setError((current) => {
      const copia = { ...current };
      copia[campo] = mensaje ? mensaje : value ? value : "Campo incorrecto. Inténtelo nuevamente";
      return copia;
    });
  };

  return {
    validarTexto,
    validarNumero,
    validarSelect,
    error,
    setError,
    validarMail,
    validarTelefono,
    validarUId,
    validacionRut,
  };
};

export default useValidacionForm;
