import { useStateContext } from "contexts/ContextProvider";
import { useEffect, useState } from "react";


const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);

  const { setCargando } = useStateContext();

  let controller = new AbortController();

  const callEndpoint = async (axiosCall) => {
    setLoading(true);
    setCargando(true);
    if (axiosCall.controller) controller = axiosCall.controller;
    let result = {};
    try {
      result = await axiosCall.call;
    } catch (err) {
      console.log(err.message)
    }
    setLoading(false);
    setCargando(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    setCargando(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, callEndpoint, setLoading };
};

export default useFetchAndLoad;
