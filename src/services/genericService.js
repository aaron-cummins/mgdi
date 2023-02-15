import { loadAbortAxios } from "../utilities/loadAbortAxios";
import AxiosInstance from "../interceptors/AxiosInstance";

export const getList = (url) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.get(url, { signal: controller.signal }), controller };
};

export const getByID = (url, id) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.get(`${url}/${id}`, { signal: controller.signal }), controller };
};

export const postObject = (url, object) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.post(url, object, { signal: controller.signal }), controller };
};

export const postObjectByID = (url, id) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.post(`${url}/${id}`, { signal: controller.signal }), controller };
};

export const putObject = (url, object) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.put(url, object, { signal: controller.signal }), controller };
};

export const deleteObject = (url, id) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.delete(`${url}/${id}`, { signal: controller.signal }), controller };
};

export const deleteAllObject = (url) => {
  const controller = loadAbortAxios();
  return { call: AxiosInstance.delete(`${url}`, { signal: controller.signal }), controller };
};
