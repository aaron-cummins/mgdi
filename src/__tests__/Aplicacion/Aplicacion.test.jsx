import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Aplicacion } from "pages";
import { ContextProvider } from "contexts/ContextProvider";
import { SnackbarProvider } from "notistack";

describe("Aplicación", () => {
  //Realiza una limpieza después de cada ejecución de los test
  afterEach(cleanup);
  afterEach(jest.clearAllMocks);

  const renderComponent = () =>
    render(
      <ContextProvider>
        <SnackbarProvider maxSnack={2}>
          <Aplicacion />
        </SnackbarProvider>
      </ContextProvider>
    );

  /** Prueba si existe el boton para crear un nuevo elemento */
  it("Prueba si existe boton de crear nuevo", () => {
    renderComponent();
    const boton = screen.getByRole("button", { name: /nueva aplicacion/i });
    expect(boton).toBeTruthy();
  });

  /** Prueba si existe un button de submit */
  it("Prueba si existe button submit", () => {
    renderComponent();
    const submitButton = screen.getByTestId(/submittest/i);
    expect(submitButton).toBeTruthy();
  });

  /** Prueba si al salir del campo nombre con un valor vacío este muestra un mensaje de campo requerido  */
  it("validar campo Nombre vacio", async () => {
    renderComponent();
    const input = screen.getByLabelText(/nombre/i);
    expect(input).toBeTruthy();
    expect(screen.queryByText(/campo requerido/i)).toBeNull();
    fireEvent.blur(input);
    expect(screen.getByText(/campo requerido/i)).toBeTruthy();
  });

  /** Prueba si al salir del campo nombre con un valoreste mestra y oculta un mensaje de campo requerido  */
  it("validar campo Nombre con valor", async () => {
    renderComponent();
    const input = screen.getByLabelText(/nombre/i);
    expect(input).toBeTruthy();
    expect(screen.queryByText(/campo requerido/i)).toBeNull();
    fireEvent.blur(input);
    expect(screen.getByText(/campo requerido/i)).toBeTruthy();
    fireEvent.change(input, { target: { value: "Tiene algo" } });
    fireEvent.blur(input);
    expect(screen.queryByText(/campo requerido/i)).toBeNull();
  });

  /** Prueba validaciones de formulario al presionar el boton de submit */
  it("Prueba validar form por button submit", () => {
    renderComponent();
    const submitbutton = screen.getByTestId(/submittest/i);
    expect(submitbutton).toBeTruthy();
    fireEvent.click(submitbutton);
    expect(screen.getByText(/nombre requerido/i)).toBeTruthy();
  });
});
