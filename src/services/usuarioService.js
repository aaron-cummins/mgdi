import { loadAbortAxios } from "../utilities/loadAbortAxios";
import AxiosInstance from "../interceptors/AxiosInstance";
import AxiosInstanceOauth from "../interceptors/AxiosInstanceOauth";

export const login = (credenciales) => {
  const controller = loadAbortAxios();
  return {
    call: AxiosInstanceOauth.post(`oauth/token`, new URLSearchParams(credenciales), { signal: controller.signal }),
    controller,
  };
  //return { type: 'post', url: 'login', data: credenciales, signal: controller.signal, control: controller }
};

export const obtenerUsuarioCorreo = (correo) => {
  const controller = loadAbortAxios();
  //return await AxiosInstance.get(`usuarios/login/${correo}`, { signal: controller.signal});
  //return { call: AxiosInstance.get(`usuarios/login/${correo}`, { signal: controller.signal}), controller };
  return { call: AxiosInstance.get(`usuarios/permisos/${correo}`, { signal: controller.signal }), controller };
  //return { type: 'get', url: `usuarios/login/${correo}`, signal: controller.signal, control: controller }
};

export const obtenerUsuariosList = () => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.get("usuarios", { signal: controller.signal }), controller };
};

export const obtenerUsuario = (usuario) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.get(`usuarios/${usuario.id}`, { signal: controller.signal }), controller };
};

export const registrarUsuario = (usuario) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.post("usuarios", usuario, { signal: controller.signal }), controller };
};

export const actualizarUsuario = (usuario) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.put("usuarios", usuario, { signal: controller.signal }), controller };
};

export const eliminarUsuario = (id) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.delete(`usuarios/${id}`, { signal: controller.signal }), controller };
};
