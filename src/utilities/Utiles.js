export const closeModal = () => {
  let close = document.querySelector("#cerrar_modal_");
  close.click();
};

export const fuerzaFiltros = () => {
  let buscar = document.querySelector("#filtro_ANZR_");
  buscar.click();
};

export const formatDate = (fecha_para_formatear) => {
  let fecha = new Date(fecha_para_formatear);
  let ano = fecha.getFullYear();
  let mes = fecha.getMonth() + 1 <= 9 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1;
  let dia = fecha.getDate() <= 9 ? `0${fecha.getDate()}` : fecha.getDate();
  let hora = fecha.getHours() <= 9 ? `0${fecha.getHours()}` : fecha.getHours();
  let min = fecha.getMinutes() <= 9 ? `0${fecha.getMinutes()}` : fecha.getMinutes();
  let sec = fecha.getSeconds() <= 9 ? `0${fecha.getSeconds()}` : fecha.getSeconds();

  let formatted_date = ano + "-" + mes + "-" + dia + "T" + hora + ":" + min + ":" + sec;

  return formatted_date;
};

export const formatDateshort = (fecha_para_formatear) => {
  let fecha = new Date(fecha_para_formatear);
  let ano = fecha.getFullYear();
  let mes = fecha.getMonth() + 1 <= 9 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1;
  let dia = fecha.getDate() <= 9 ? `0${fecha.getDate()}` : fecha.getDate();

  let formatted_date = ano + "-" + mes + "-" + dia;

  return formatted_date;
};

export const Year = (fecha_para_formatear) => {
  let fecha = new Date(fecha_para_formatear);
  let ano = fecha.getFullYear();
  return ano;
};

export const Month = (fecha_para_formatear) => {
  let fecha = new Date(fecha_para_formatear);
  let mes = fecha.getMonth() + 1;
  return mes;
};
