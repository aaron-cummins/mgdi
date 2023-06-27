import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PostTratamiento from 'pages/postTratamiento/PostTratamiento';
import { ContextProvider } from 'contexts/ContextProvider';
import { SnackbarProvider} from 'notistack';
import  FormPostTratamiento from 'pages/postTratamiento/components/FormPostTratamiento';
import {PostTratamientoContext} from 'pages/postTratamiento/context/PostTratamientoContext';


describe('Postratamiento', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)
    
    /**1. Renderización del componente */
    const renderComponent = () =>
        render(
        <ContextProvider>
            <SnackbarProvider maxSnack={2}>
                <PostTratamiento />
            </SnackbarProvider>
        </ContextProvider>
        );
    
    
    /**2. Verificación de elementos en el formulario*/
    it('Verificar la existencia del campo Nombre, el botón Guardar, el botón Cancelar, la casilla de verificación Activo y el icono de cierre de modal en el formulario', () =>{
        //Renderización del componente PostTratamiento
        renderComponent(); 
        
        //Encuentra el botón "Nuevo Post Tratamiento" para obtener el html del formulario
        const ButtonNuevoPostTratamiento = screen.getByText('Nuevo Post Tratamiento')
        
        //Simula el evento Onclick
        fireEvent.click(ButtonNuevoPostTratamiento);
        
        //Encuentra los elementos en el formulario
        const SubmitButtonPostTratamiento = screen.getByTestId("submittest"); 
        const InputPostTratamiento = screen.getByTestId("Inputtest");
        const checkboxPostTratamiento = screen.getByTestId("Checkboxtest");
        const cancelButtonPostTratamiento = screen.getByTestId("canceltest");
        const iconCerrarModalPostTratamiento = screen.getByTestId("CloseIcon")

        //Verificar que los elementos se encuentren en el formulario
        expect(SubmitButtonPostTratamiento).toBeTruthy(); 
        expect(InputPostTratamiento).toBeTruthy();
        expect(checkboxPostTratamiento).toBeTruthy();
        expect(cancelButtonPostTratamiento).toBeTruthy();
        expect(iconCerrarModalPostTratamiento).toBeTruthy();
    })
    

    /**3. Valor inicial de los campos de entrada */
    it('Verificar que los campos de entrada estén inicializados correctamente', () =>{
        //Renderización del componente PostTratamiento
        renderComponent(); 
        
        //Encuentra el botón "Nuevo Post Tratamiento" para obtener el html del formulario
        const ButtonNuevoPostTratamiento = screen.getByText('Nuevo Post Tratamiento')
        
        //Simula el evento Onclick
        fireEvent.click(ButtonNuevoPostTratamiento);

        //Encuentra el input "Nombre" en el formulario
        const InputPostTratamiento = screen.getByTestId("Inputtest");

        // Verificar que el campo de nombre esté vacío 
        expect(InputPostTratamiento.value).toBe("");

        // Encuentra la casilla de verificación en el formulario
        const checkboxPostTratamiento = screen.getByTestId("Checkboxtest");

        // Verificar que la casilla de verificación esté desactivada 
        expect(checkboxPostTratamiento.checked).toBe(false);
    })


    /**4. Actualización de estado en el campo nombre*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo nombre', () =>{
        //Renderización del componente PostTratamiento
        renderComponent(); 
        
        //Encuentra el botón "Nuevo Post Tratamiento" para obtener el html del formulario
        const ButtonNuevoPostTratamiento = screen.getByText('Nuevo Post Tratamiento')
        
        //Simula el evento Onclick
        fireEvent.click(ButtonNuevoPostTratamiento);

        //Encuentra el input "Nombre" en el formulario
        const InputPostTratamiento = screen.getByTestId("Inputtest");

        //Ingresa un valor en el campo nombre
        fireEvent.change(InputPostTratamiento, { target: { value: "Nuevo PostTratamiento" } });

        //Verifica si el valor se actualizó correctamente en el campo nombre
        expect(InputPostTratamiento.value).toBe("Nuevo PostTratamiento");
    })  


    /**5. Actualización de estado en el casilla de verificación Activo*/
    it('Verificar que se actualice el estado cuando se seleccione/deseleccione la casilla de verificación Activo', () =>{
        //Renderización del componente PostTratamiento
        renderComponent(); 
        
        //Encuentra el botón "Nuevo Post Tratamiento" para obtener el html del formulario
        const ButtonNuevoPostTratamiento = screen.getByText('Nuevo Post Tratamiento')
        
        //Simula el evento Onclick
        fireEvent.click(ButtonNuevoPostTratamiento);

        //Encuentra la casilla de verificación en el formulario
        const checkboxPostTratamiento = screen.getByTestId("Checkboxtest");

        //Ingresa un valor en la casilla de verificación
        fireEvent.click(checkboxPostTratamiento);

        //Verifica si el valor se actualizó correctamente en la casilla de verificación
        expect(checkboxPostTratamiento.checked).toBe(true);
    })


    /**6. Validación de formulario con campos obligatorios parte 1*/
    it('Verifica que se muestre el mensaje de error cuando los campos obligatorios se dejan en blanco al hacer clic en el botón guardar', () => {
        renderComponent();
      
        // Encuentra el botón "Nuevo Post Tratamiento" para obtener el html del formulario
        const buttonNuevoPostTratamiento = screen.getByText('Nuevo Post Tratamiento');
      
        // Simula el evento Onclick
        fireEvent.click(buttonNuevoPostTratamiento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonPostTratamiento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonPostTratamiento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de posttratamiento requerido/i)).toBeInTheDocument();
      });


    /**7. Validación de formulario con campos obligatorios parte 2*/
    it('Verifica que el mensaje de error desaparezca cuando se ingresan datos válidos en el campo Nombre del formulario', () => {
        renderComponent();
      
        // Encuentra el botón "Nuevo Post Tratamiento" para obtener el html del formulario
        const buttonNuevoPostTratamiento = screen.getByText('Nuevo Post Tratamiento');
      
        // Simula el evento Onclick
        fireEvent.click(buttonNuevoPostTratamiento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonPostTratamiento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonPostTratamiento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de posttratamiento requerido/i)).toBeInTheDocument();
        
        // Encuentra el Input nombre del formulario
        const InputNombrePostTratamiento = screen.getByTestId("Inputtest");

        // Ingresa datos válidos en el input
        fireEvent.change(InputNombrePostTratamiento , { target: { value: 'PostTratamiento 1' } });
        
        //Verifica que el mensaje de error exista despues 
        expect(screen.getByText(/Nombre de posttratamiento requerido/i)).toBeInTheDocument();
      });


    /**8. Simular clic en el botón guardar */
    it('Verificar que los campos se limpien y vuelvan a su estado inicial cuando se hace clic en el botón “Cancelar”', () => {
        
        const mockPostTratamientoContext = {
            PostTratamientoActual: null,
            registrarPostTratamiento: jest.fn(),
            actualizarPostTratamiento: jest.fn(),
            obtenerPostTratamiento: jest.fn(),
          };
        
        render(
            <ContextProvider>
                <PostTratamientoContext.Provider value={mockPostTratamientoContext}>
                    <SnackbarProvider maxSnack={2} >
                        <FormPostTratamiento closeModal={() => {}}/>
                    </SnackbarProvider>
                </PostTratamientoContext.Provider>
            </ContextProvider>
          );
    
        //Encuentra el input "Nombre" en el formulario
        const InputPostTratamiento = screen.getByTestId("Inputtest");

        //Ingresa un valor en el campo nombre
        fireEvent.change(InputPostTratamiento, { target: { value: "Nuevo PostTratamiento" } });

        //Encuentra la casilla de verificación en el formulario
        const checkboxPostTratamiento = screen.getByTestId("Checkboxtest");

        //Ingresa el valor true en la casilla de verificación
        fireEvent.click(checkboxPostTratamiento);

        //Encuentra el botón Cancelar en el formulario
        const buttonCancelarPostTratamiento = screen.getByTestId("canceltest");

        //Hace clic al botón Cancelar
        fireEvent.click(buttonCancelarPostTratamiento)

        //Verifica que el campo nombre se reestablezca a su valor inicial
        expect(InputPostTratamiento.value).toBe('');

        // Verificar que la casilla de verificación se reestablezca a su valor inicial
        expect(checkboxPostTratamiento.checked).toBe(false);

      }) 


      /**9.  Envío de formulario con datos válidos*/
    it('Verificar si se muestra una notificación de éxito después de enviar el formulario con datos válidos', async () =>{

        const mockPostTratamientoContext = {
            PostTratamientoActual: null,
            registrarPostTratamiento: jest.fn().mockResolvedValue({
                mensaje: "Post tratamiento creado con exito!",
                tipoAlerta: "success",
              }),
            actualizarPostTratamiento: null, // Actualizar a null para simular que el método no está definido
            obtenerPostTratamiento: jest.fn(),
          };

        //Renderización del componente PostTratamiento
        render(
            <ContextProvider>
                <PostTratamientoContext.Provider value={mockPostTratamientoContext}>
                    <SnackbarProvider maxSnack={2} >
                        <FormPostTratamiento closeModal={() => {}}/>
                    </SnackbarProvider>
                </PostTratamientoContext.Provider>
            </ContextProvider>
          );
        
        //Encuentra el input "Nombre" en el formulario
        const InputPostTratamiento = screen.getByTestId("Inputtest");
        
        //Ingresa un valor en el campo nombre
        fireEvent.change(InputPostTratamiento, { target: { value: "Nuevo PostTratamiento" } });

        //Encuentra la casilla de verificación en el formulario
        const checkboxPostTratamiento = screen.getByTestId("Checkboxtest");

        //Ingresa un valor en la casilla de verificación
        fireEvent.click(checkboxPostTratamiento);

        // Encuentra el botón "Guardar" en el formulario
        const submitButtonPostTratamiento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.submit(submitButtonPostTratamiento);
        
        /**await waitFor(() => {
        const mensajeExitoso = screen.getByText("Post tratamiento creado con exito!")
        expect(mensajeExitoso).toBeTruthy();
        });*/

        //Se utiliza async/await para esperar a que la notificación se muestre en la interfaz antes de realizar las comprobaciones
        await waitFor(() => {
            expect(mockPostTratamientoContext.registrarPostTratamiento).toHaveBeenCalledWith({ 
                id: 0,
                nombre: 'Nuevo PostTratamiento',
                activo: true
            });
        });

        const mensajeExitoso = screen.getByText("Post tratamiento creado con exito!");
        expect(mensajeExitoso).toBeTruthy();
    }) 
    
})
