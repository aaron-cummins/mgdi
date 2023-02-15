export const loadAbortAxios = () => {
    const controller = new AbortController();
    return controller;
}