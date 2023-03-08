import { render, screen } from "@testing-library/react";
import { ContextProvider } from "contexts/ContextProvider";
import { SnackbarProvider } from "notistack";
import { AplicacionOem } from "pages";

test("Prueba de Aplicación Oem", async () => {
  render(
    <ContextProvider>
      <SnackbarProvider maxSnack={2}>
        <AplicacionOem />
      </SnackbarProvider>
    </ContextProvider>
  );

  console.log(screen);

  const element = screen.getAllByText(/guardar/i); //await screen.findAllByAltText("Aplicación");

  expect(element).toBeTruthy();
});
