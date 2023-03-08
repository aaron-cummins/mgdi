import { render, screen } from "@testing-library/react";
import { ContextProvider } from "contexts/ContextProvider";
import { SnackbarProvider } from "notistack";
import { Aplicacion } from "pages";

test("Prueba de Aplicación", async () => {
  render(
    <ContextProvider>
      <SnackbarProvider maxSnack={2}>
        <Aplicacion />
      </SnackbarProvider>
    </ContextProvider>
  );

  console.log(screen);

  const element = screen.getAllByText(/guardar/i); //await screen.findAllByAltText("Aplicación");

  expect(element).toBeTruthy();
});
