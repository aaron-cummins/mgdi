import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Flotas from 'pages/flotas/Flotas';
import { ContextProvider } from 'contexts/ContextProvider';
import { SnackbarProvider} from 'notistack';
import FormFlota from 'pages/flotas/components/FormFlota';
import { FlotaContext } from 'pages/flotas/context/flotaContext';

describe('Flotas', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)
    
    /**1. Renderización del componente */
    const renderComponent = () =>
        render(
        <ContextProvider>
            <SnackbarProvider maxSnack={2}>
                <Flotas />
            </SnackbarProvider>
        </ContextProvider>
        );
    
    
    /**2. Verificación de elementos en el formulario*/
    it('Verificar la existencia del campo Nombre, el botón Guardar, el botón Cancelar, la casilla de verificación Activo y el icono de cierre de modal en el formulario', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nueva Flota')
        fireEvent.click(ButtonNuevoElemento);
        
        //Encuentra los elementos en el formulario
        const SubmitButtonElemento = screen.getByTestId("submittest"); 
        const InputElemento = screen.getByTestId("Inputtest");
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        const cancelButtonElemento = screen.getByTestId("canceltest");
        const iconCerrarModalElemento = screen.getByTestId("CloseIcon")

        //Verificar que los elementos se encuentren en el formulario
        expect(SubmitButtonElemento).toBeTruthy(); 
        expect(InputElemento).toBeTruthy();
        expect(checkboxElemento).toBeTruthy();
        expect(cancelButtonElemento).toBeTruthy();
        expect(iconCerrarModalElemento).toBeTruthy();
    })
    

    /**3. Valor inicial de los campos de entrada */
    it('Verificar que los campos de entrada estén inicializados correctamente', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nueva Flota')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el input "Nombre" en el formulario
        const InputElemento = screen.getByTestId("Inputtest");

        // Verificar que el campo de nombre esté vacío 
        expect(InputElemento.value).toBe("");

        // Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        // Verificar que la casilla de verificación esté desactivada 
        expect(checkboxElemento.checked).toBe(false);
    })


    /**4. Actualización de estado en el campo nombre*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo nombre', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nueva Flota')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el input "Nombre" en el formulario
        const InputElemento = screen.getByTestId("Inputtest");

        //Ingresa un valor en el campo nombre
        fireEvent.change(InputElemento, { target: { value: "Nueva Flota" } });

        //Verifica si el valor se actualizó correctamente en el campo nombre
        expect(InputElemento.value).toBe("Nueva Flota");
    }) 


    /**5. Actualización de estado en el casilla de verificación Activo*/
    it('Verificar que se actualice el estado cuando se seleccione/deseleccione la casilla de verificación Activo', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nueva Flota')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa un valor en la casilla de verificación
        fireEvent.click(checkboxElemento);

        //Verifica si el valor se actualizó correctamente en la casilla de verificación
        expect(checkboxElemento.checked).toBe(true);
    })


    /**6. Validación de formulario con campos obligatorios parte 1*/
    it('Verifica que se muestre el mensaje de error cuando los campos obligatorios se dejan en blanco al hacer clic en el botón guardar', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nueva Flota');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);

        screen.debug()
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre requerido/i)).toBeInTheDocument();
      });


    /**7. Validación de formulario con campos obligatorios parte 2*/
    it('Verifica que el mensaje de error desaparezca cuando se ingresan datos válidos en el campo Nombre del formulario', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nueva flota');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre requerido/i)).toBeInTheDocument();
        
        // Encuentra el Input nombre del formulario
        const InputNombreElemento = screen.getByTestId("Inputtest");

        // Ingresa datos válidos en el input
        fireEvent.change(InputNombreElemento , { target: { value: 'Flota 1' } });
        
        //Verifica que el mensaje de error exista despues 
        expect(screen.getByText(/Nombre requerido/i)).toBeInTheDocument();
      });


    /**8. Simular clic en el botón guardar */
    it('Verificar que los campos se limpien y vuelvan a su estado inicial cuando se hace clic en el botón “Cancelar”', () => {
        
        const mockFlotaContext = {
            flotaActual: null,
            registrarFlota: jest.fn(),
            actualizarFlota: jest.fn(),
            obtenerFlota: jest.fn(),
          };
        
        render(
            <ContextProvider>
                <FlotaContext.Provider value={mockFlotaContext}>
                    <SnackbarProvider maxSnack={2} >
                        <FormFlota closeModal={() => {}}/>
                    </SnackbarProvider>
                </FlotaContext.Provider>
            </ContextProvider>
          );
    
        //Encuentra el input "Nombre" en el formulario
        const InputElemento = screen.getByTestId("Inputtest");

        //Ingresa un valor en el campo nombre
        fireEvent.change(InputElemento, { target: { value: "Nueva Flota" } });

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa el valor true en la casilla de verificación
        fireEvent.click(checkboxElemento);

        //Encuentra el botón Cancelar en el formulario
        const buttonCancelarElemento = screen.getByTestId("canceltest");

        //Hace clic al botón Cancelar
        fireEvent.click(buttonCancelarElemento)

        //Verifica que el campo nombre se reestablezca a su valor inicial
        expect(InputElemento.value).toBe('');

        // Verificar que la casilla de verificación se reestablezca a su valor inicial
        expect(checkboxElemento.checked).toBe(false);

      }) 


      /**9.  Envío de formulario con datos válidos*/
    it('Verificar si se muestra una notificación de éxito después de enviar el formulario con datos válidos', async () =>{

        const mockFlotaContext = {
            flotaActual: null,
            registrarFlota: jest.fn().mockResolvedValue({
                mensaje: "Flota creada con exito!",
                tipoAlerta: "success",
              }),
            actualizarFlota: null, // Actualizar a null para simular que el método no está definido
            obtenerFlota: jest.fn(),
          };

        //Renderización del componente 
        render(
            <ContextProvider>
                <FlotaContext.Provider value={mockFlotaContext}>
                    <SnackbarProvider maxSnack={2} >
                        <FormFlota closeModal={() => {}}/>
                    </SnackbarProvider>
                </FlotaContext.Provider>
            </ContextProvider>
          );
        
        //Encuentra el input "Nombre" en el formulario
        const InputElemento = screen.getByTestId("Inputtest");
        
        //Ingresa un valor en el campo nombre
        fireEvent.change(InputElemento, { target: { value: "Nueva Flota" } });

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa un valor en la casilla de verificación
        fireEvent.click(checkboxElemento);

        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.submit(submitButtonElemento);

        //Se utiliza async/await para esperar a que la notificación se muestre en la interfaz antes de realizar las comprobaciones
        await waitFor(() => {
            expect(mockFlotaContext.registrarFlota).toHaveBeenCalledWith({ 
                id: 0,
                nombre: 'Nueva Flota',
                activo: true
            });
        });

        const mensajeExitoso = screen.getByText("Flota creada con exito!");
        expect(mensajeExitoso).toBeTruthy();
    }) 
    
})
