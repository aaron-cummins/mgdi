
export const createUserAdapter = (usuario) => (
    {    
    //id: usuario.id,
    //rut: usuario.rut,
    uid: usuario.uid,
    nombres: usuario.nombre ? usuario.nombre : usuario.nombres,
    //apellidos: usuario.apellidos,
    correo: usuario.correo,
    //telefono: usuario.telefono,
    //anexo: usuario.anexo,
    //id_cargo: usuario.cargo.id,
    cargo: {
        //id: usuario.cargo?.id,
        nombre: usuario.cargo.nombre ? usuario.cargo.nombre : usuario.cargo
    },

    permisos_mgdi: usuario.relacion_base ? usuario.relacion_base : usuario.permisos_mgdi,
    permisos_analytics: usuario.relacion_analytics ? usuario.relacion_analytics : usuario.permisos_analytics,
    permisos_dbm: usuario.relacion_dbm ? usuario.relacion_dbm : usuario.permisos_dbm,
    permisos_specto: usuario.relacion_specto ? usuario.relacion_specto : usuario.permisos_specto,

    lugarTrabajos: {
        id: usuario.relacion_base ? usuario?.relacion_base[0]['lugar_trabajo_id'] : usuario.lugarTrabajos.id
    },
    //activo: usuario.activo
})


export const loginAdapter = (correo) => (
    {
        username: correo,
        password: correo,
        grant_type: process.env.REACT_APP_GRANT_TYPE
    }
)