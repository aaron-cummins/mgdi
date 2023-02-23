/** PERSISTENCIA DE LA DATA **/
export const persistUsuarioState = (usuario) => {
  //localStorage.setItem('user_info', JSON.stringify({ ...usuario}));
  sessionStorage.setItem("user_info", JSON.stringify({ ...usuario }));

  let l_trabajo = [];

  usuario.permisos_mgdi.map((item) => l_trabajo.push(item));

  let LTrabajos = new Set(l_trabajo);
  let LugarTrabajo = [...LTrabajos];
  //console.log(LugarTrabajo);
  LugarTrabajo = LugarTrabajo ? LugarTrabajo : [0];
  sessionStorage.setItem("user_info_lugaresTrabajo", JSON.stringify({ LugarTrabajo }));
  //localStorage.setItem("user_info_lugaresTrabajo", JSON.stringify({ LugarTrabajo }));

  let id_trabajo = usuario.lugarTrabajos.id ? usuario.lugarTrabajos.id : 0;
  sessionStorage.setItem("user_info_lugarTrabajo_actual", id_trabajo);
  //localStorage.setItem("user_info_lugarTrabajo_actual", id_trabajo);
};

export const persistJwt = (jwt, Rjwt) => {
  sessionStorage.setItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF", jwt);
  //localStorage.setItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF", jwt);
  sessionStorage.setItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF_refresh", Rjwt);
  //localStorage.setItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF_refresh", Rjwt);
};

/*  Elimina los datos de sesion */
export const LogOut = () => {
  sessionStorage.clear();
  localStorage.clear();
  //localStorage.removeItem("accessToken");
  sessionStorage.removeItem("user_info");
  //localStorage.removeItem("user_info");
  sessionStorage.removeItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");
  //localStorage.removeItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");
  sessionStorage.removeItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF_refresh");
  //localStorage.removeItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF_refresh");
  window.location.href = "/";
  return true;
};

/* Obtiene el usuario guardando en la sessionStorage  */
export const getUsuarioPersist = () => {
  let userPerfil = null;
  const usuarioLog = sessionStorage.getItem("user_info");
  //const usuarioLog = localStorage.getItem("user_info");
  const jwtLog = sessionStorage.getItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");
  //const jwtLog = localStorage.getItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");

  if (
    (usuarioLog !== "" || usuarioLog !== null || usuarioLog !== undefined) &&
    (jwtLog !== "" || jwtLog !== null || jwtLog !== undefined)
  ) {
    userPerfil = JSON.parse(usuarioLog);
  }
  return userPerfil;
};

export const setUsuarioLugarTrabajo = (id_lugar_trabajo, name_lugar_trabajo) => {
  sessionStorage.setItem("user_info_lugarTrabajo_actual", id_lugar_trabajo);
  sessionStorage.setItem("user_info_lugarTrabajo_actual_name", name_lugar_trabajo);
  //return localStorage.setItem("user_info_lugarTrabajo_actual", id_lugar_trabajo);
};

export const getUsuarioLugarTrabajo = () => {
  let lt = sessionStorage.getItem("user_info_lugarTrabajo_actual");
  //let lt = localStorage.getItem("user_info_lugarTrabajo_actual");
  return lt;
};

export const getUsuarioLugarTrabajoName = () => {
  let ltn = sessionStorage.getItem("user_info_lugarTrabajo_actual_name");
  //let lt = localStorage.getItem("user_info_lugarTrabajo_actual");
  return ltn;
};

export const getUsuarioLugaresTrabajoList = () => {
  return JSON.parse(sessionStorage.getItem("user_info_lugaresTrabajo"));
  //return JSON.parse(localStorage.getItem("user_info_lugaresTrabajo"));
};

export const getPermisosUser = (lugar_trabajo) => {
  let permisos = [
    {
      id: 0,
      nombre: "Inicio",
      controller: "inicio",
      accion: "inicio",
      icono: 0,
    },
  ];

  let modulos = JSON.parse(sessionStorage.getItem("user_info"));
  modulos.permisos.forEach((item) => {
    if (item.lugarTrabajo === lugar_trabajo) {
      let permisosGlob = item.roles.permisosGlobales;
      permisosGlob.forEach((i) => {
        i.modulo && permisos.push(i.modulo);
      });
    }
  });
  return permisos;
};

export const PermisosUsuario = (permisos) => {
  let permisosU = [
    {
      id: 0,
      nombre: "Inicio",
      controller: "inicio",
      accion: "inicio",
      icono: 0,
    },
  ];

  permisos.forEach((item) => {
    permisosU.push({
      id: item.moduloId,
      nombre: item.modulo,
      controller: item.moduloController,
      accion: "#",
      icono: item.moduloIcono,
      grupo: item.vistas,
    });
  });

  //if(grupoID !== item.grupoId) grupoID = item.grupoId ;
  return permisosU;
};

export const getUsuarioId = () => {
  return JSON.parse(sessionStorage.getItem("user_info"))["id"];
};

export const getUsuarioEmail = () => {
  return JSON.parse(sessionStorage.getItem("user_info"))["correo"];
};
