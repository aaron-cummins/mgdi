import { useSnackbar } from "notistack";

const Snackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const success = (mensaje) => enqueueSnackbar(mensaje, { variant: "success" });
  const error = (mensaje) => enqueueSnackbar(mensaje, { variant: "error" });
  const warning = (mensaje) => enqueueSnackbar(mensaje, { variant: "warning" });
  const info = (mensaje) => enqueueSnackbar(mensaje, { variant: "info" });

  return { success, error, warning, info };
};

export default Snackbar;
