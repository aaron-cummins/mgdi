import { useEffect } from 'react';

export const useAsync = (asynncFn, successFuncion, returnFuncion,dependencies = []) => {
    useEffect(() => {
        let isActive = true;
        asynncFn().then((result) => {
            if ( isActive ) {
                successFuncion && successFuncion(result.data);
            }
        });
    
        return () => {
            returnFuncion && returnFuncion();
            isActive = false;
        }
    }, dependencies);
}

export default useAsync;