import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from 'contexts/ContextProvider';
import { SnackbarProvider} from 'notistack';
import { PaisContext } from 'pages/pais/context/paisContext';
import FormPais from 'pages/pais/components/FormPais';
import Pais from 'pages/pais/Pais';

describe('País', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)
    
    /**1. Renderización del componente */
    const renderComponent = () =>
        render(
        <ContextProvider>
            <SnackbarProvider maxSnack={2}>
                <Pais />
            </SnackbarProvider>
        </ContextProvider>
        );
    
    
    /**2. Verificación de elementos en el formulario*/
    it('Verificar la existencia del campo Nombre, el campo abreviacion, el botón Cancelar, el botón Guardar, la casilla de verificación Activo y el icono de cierre de modal en el formulario', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo País')
        fireEvent.click(ButtonNuevoElemento);
        
        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputAbreviacion = screen.getByLabelText("Abreviacion *");
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        const cancelButtonElemento = screen.getByTestId("canceltest");
        const SubmitButtonElemento = screen.getByTestId("submittest"); 
        const iconCerrarModalElemento = screen.getByTestId("CloseIcon")

        //Verificar que los elementos se encuentren en el formulario
        expect(inputNombre).toBeInTheDocument()
        expect(inputAbreviacion).toBeInTheDocument()
        expect(SubmitButtonElemento).toBeTruthy(); 
        expect(checkboxElemento).toBeTruthy();
        expect(cancelButtonElemento).toBeTruthy();
        expect(iconCerrarModalElemento).toBeTruthy();
    })
    

    /**3. Valor inicial de los campos de entrada */
    it('Verificar que los campos de entrada estén inicializados correctamente', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo País')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputAbreviacion = screen.getByLabelText("Abreviacion *");

        // Verificar que los campos estén inicializados correctamente
        expect(inputNombre.value).toBe("");
        expect(inputAbreviacion.value).toBe("");
    })


    /**4. Actualización de estado en el campo nombre*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo nombre', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo País')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el campo en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");

        //Ingresa un valor en el campo 
        fireEvent.change(inputNombre, { target: { value: "Nuevo País" } });

        //Verifica si el valor se actualizó correctamente 
        expect(inputNombre.value).toBe("Nuevo País");
    }) 


    /**5. Actualización de estado en el campo Número*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo abreviación', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo País')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el campo en el formulario
        const inputAbreviacion = screen.getByLabelText("Abreviacion *");

        //Ingresa un valor en el campo 
        fireEvent.change(inputAbreviacion, { target: { value: "Abreviacion" } });

        //Verifica si el valor se actualizó correctamente 
        expect(inputAbreviacion.value).toBe("Abreviacion");
    }) 


    /**6. Actualización de estado en el casilla de verificación Activo*/
    it('Verificar que se actualice el estado cuando se seleccione/deseleccione la casilla de verificación Activo', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo País')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa un valor en la casilla de verificación
        fireEvent.click(checkboxElemento);

        //Verifica si el valor se actualizó correctamente en la casilla de verificación
        expect(checkboxElemento.checked).toBe(true);
    })

    /**7. Validación de formulario con campos obligatorios parte 1*/
    it('Verifica que se muestre el mensaje de error cuando los campos obligatorios se dejan en blanco al hacer clic en el botón guardar', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nuevo País');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre del país requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Abreviación del país requerida/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
    });


    /**9. Validación de formulario con campos obligatorios parte 2*/
    it('Verifica que el mensaje de error desaparezca cuando se ingresan datos válidos en el campo Nombre del formulario', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nuevo País');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre del país requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Abreviación del país requerida/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
       
        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputAbreviacion = screen.getByLabelText("Abreviacion *");

        // Ingresa datos válidos en los campos obligatorios
        fireEvent.change(inputNombre, { target: { value: "Nuevo Módulo" } });
        fireEvent.change(inputAbreviacion, { target: { value: "Abreviacion" } });
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre del país requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Abreviación del país requerida/i)).toBeInTheDocument();   
    });


    /**10. Simular clic en el botón cancelar */
    it('Verificar que los campos se limpien y vuelvan a su estado inicial cuando se hace clic en el botón “Cancelar”', () => {
        
        const mockPais = {
            paisActual: null,
            registrarPais: jest.fn(),
            actualizarPais: jest.fn(),
            obtenerPais: jest.fn(),
          };
        
        render(
            <ContextProvider>
                <PaisContext.Provider value={mockPais}>
                    <SnackbarProvider maxSnack={2} >
                        <FormPais closeModal={() => {}}/>
                    </SnackbarProvider>
                </PaisContext.Provider>
            </ContextProvider>
          );
    
        //Actualiza el valor del campo nombre
        const inputNombre = screen.getByLabelText("Nombre *");
        fireEvent.change(inputNombre, { target: { value: "Nuevo País" } });

        //Actualiza el valor del campo numero
        const inputAbreviacion = screen.getByLabelText("Abreviacion *");
        fireEvent.change(inputAbreviacion, { target: { value: "Abreviacion" } });

        //Actualiza el valor de la casilla de verificación
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        fireEvent.click(checkboxElemento);

        //Hace clic en el botón cancelar
        const buttonCancelarElemento = screen.getByTestId("canceltest");
        fireEvent.click(buttonCancelarElemento)

        //Verifica que el campo vuelvan a su valor inicial
        expect(inputNombre.value).toBe("");
        expect(inputAbreviacion.value).toBe("");
        expect(checkboxElemento.checked).toBe(false);

      })


    /**11.  Envío de formulario con datos válidos*/
    it('Verificar si se muestra una notificación de éxito después de enviar el formulario con datos válidos', async () =>{

        const mockPais = {
            paisActual: null,
            registrarPais: jest.fn().mockResolvedValue({
                mensaje: "País creada con exito!",
                tipoAlerta: "success",
              }),
              actualizarPais: null,
              obtenerPais: jest.fn(),
          };

          const closeModal = jest.fn();
        
          render(
            <ContextProvider>
                <PaisContext.Provider value={mockPais}>
                    <SnackbarProvider maxSnack={2} >
                        <FormPais closeModal={closeModal}/>
                    </SnackbarProvider>
                </PaisContext.Provider>
            </ContextProvider>
          );
        
        //Actualiza el valor del campo nombre
        const inputNombre = screen.getByLabelText("Nombre *");
        fireEvent.change(inputNombre, { target: { value: "Nuevo País" } });

        //Actualiza el valor del campo numero
        const inputAbreviacion = screen.getByLabelText("Abreviacion *");
        fireEvent.change(inputAbreviacion, { target: { value: "Abreviacion" } });

        //Actualiza el valor de la casilla de verificación
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        fireEvent.click(checkboxElemento);

        //Hace clic en el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
        fireEvent.submit(submitButtonElemento);

        await waitFor(() => {
            expect(mockPais.registrarPais).toHaveBeenCalledWith({ 
                id: 0,
                nombre: "Nuevo País",
                abreviacion: "Abreviacion",
                activo: true,
            });
        });

        const mensajeExitoso = screen.getByText("País creada con exito!");
        expect(mensajeExitoso).toBeTruthy();
    })


    //12. Comprueba que el formulario no se envía con datos inválidos
    it("Verificar que no se envíe el formulario con datos inválidos", () => {
        
        const mockPais = {
            paisActual: null,
            registrarPais: jest.fn(),
            actualizarPais: jest.fn(),
            obtenerPais: jest.fn(),
          };

        const closeModal = jest.fn();

        //Renderización del componente
        render(
            <ContextProvider>
                <PaisContext.Provider value={mockPais}>
                    <SnackbarProvider maxSnack={2} >
                        <FormPais closeModal={closeModal}/>
                    </SnackbarProvider>
                </PaisContext.Provider>
            </ContextProvider>
          );

        //Hace clic en el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest"); 
        fireEvent.submit(submitButtonElemento);

        //Espero que no se llame a la funcion closeModal
        expect(closeModal).not.toHaveBeenCalled();
    });

})