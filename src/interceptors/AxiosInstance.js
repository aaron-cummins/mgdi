import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

AxiosInstance.interceptors.request.use(
    (request) => {
      request.headers.common['Accept'] = 'application/json';
      request.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('@AnZr1SmZp2CvPa3-ToKnN_@CDRF')}`;
      request.headers.post['Content-Type'] = 'application/json';
      return request;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use((response) => 
  new Promise((resolve, reject) => {
    resolve(response);
  }),
  (error) => {
    if(!error.response){
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if(error.response.status === 403){
      //const { setMensajeErr } = useContext(LoginContext);
      //setMensajeErr("Se termino su sesion, favor ingresar nuevamente.");

      console.log(error.response);

      sessionStorage.clear();
      localStorage.removeItem('accessToken');
      
      window.location.href = '/?forbiden';
    }
    if(error.response.status === 404){
        console.log("no lo encontro, 404");
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
    if(error.response.status === 500){
      console.log("500 - " , error.response);
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
  }

);

export default AxiosInstance;