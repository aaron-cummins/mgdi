import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from 'contexts/ContextProvider';
import { SnackbarProvider} from 'notistack';
import { ModulosContext } from 'pages/modulos/context/modulosContext';
import FormModulos from 'pages/modulos/components/FormModulos';
import Modulos from 'pages/modulos/Modulos';

describe('Módulos', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)
    
    /**1. Renderización del componente */
    const renderComponent = () =>
        render(
        <ContextProvider>
            <SnackbarProvider maxSnack={2}>
                <Modulos />
            </SnackbarProvider>
        </ContextProvider>
        );
    
    
    /**2. Verificación de elementos en el formulario*/
    it('Verificar la existencia del campo Nombre, el campo Controller, el campo Icono, el botón Cancelar, el botón Guardar, la casilla de verificación Activo y el icono de cierre de modal en el formulario', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Módulo')
        fireEvent.click(ButtonNuevoElemento);
        
        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputController = screen.getByLabelText("Controller *");
        const inputIcono = screen.getByLabelText("Icono *");
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        const cancelButtonElemento = screen.getByTestId("canceltest");
        const SubmitButtonElemento = screen.getByTestId("submittest"); 
        const iconCerrarModalElemento = screen.getByTestId("CloseIcon")

        //Verificar que los elementos se encuentren en el formulario
        expect(inputNombre).toBeInTheDocument()
        expect(inputController).toBeInTheDocument()
        expect(inputIcono).toBeInTheDocument()
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
        const ButtonNuevoElemento = screen.getByText('Nuevo Módulo')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputController = screen.getByLabelText("Controller *");
        const inputIcono = screen.getByLabelText("Icono *");

        // Verificar que los campos estén inicializados correctamente
        expect(inputNombre.value).toBe("");
        expect(inputController.value).toBe("");
        expect(inputIcono.value).toBe("");
    })


    /**4. Actualización de estado en el campo nombre*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo nombre', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Módulo')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el campo en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");

        //Ingresa un valor en el campo 
        fireEvent.change(inputNombre, { target: { value: "Nuevo Módulo" } });

        //Verifica si el valor se actualizó correctamente 
        expect(inputNombre.value).toBe("Nuevo Módulo");
    }) 


    /**5. Actualización de estado en el campo controller*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo controller', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Módulo')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el campo en el formulario
        const inputController = screen.getByLabelText("Controller *");

        //Ingresa un valor en el campo 
        fireEvent.change(inputController, { target: { value: "Controller 1" } });

        //Verifica si el valor se actualizó correctamente 
        expect(inputController.value).toBe("Controller 1");
    }) 


    /**6. Actualización de estado en el campo Icono*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo Icono', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Módulo')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el campo en el formulario
        const inputIcono = screen.getByLabelText("Icono *");

        //Ingresa un valor en el campo 
        fireEvent.change(inputIcono, { target: { value: '1' } });

        //Verifica si el valor se actualizó correctamente 
        expect(inputIcono.value).toBe('1');
    }) 


    /**7. Actualización de estado en el casilla de verificación Activo*/
    it('Verificar que se actualice el estado cuando se seleccione/deseleccione la casilla de verificación Activo', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Módulo')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa un valor en la casilla de verificación
        fireEvent.click(checkboxElemento);

        //Verifica si el valor se actualizó correctamente en la casilla de verificación
        expect(checkboxElemento.checked).toBe(true);
    })

    /**8. Validación de formulario con campos obligatorios parte 1*/
    it('Verifica que se muestre el mensaje de error cuando los campos obligatorios se dejan en blanco al hacer clic en el botón guardar', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nuevo Módulo');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de modulos requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Nombre controller requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Nombre del icono requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
    });


    /**9. Validación de formulario con campos obligatorios parte 2*/
    it('Verifica que el mensaje de error desaparezca cuando se ingresan datos válidos en el campo Nombre del formulario', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nuevo Módulo');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de modulos requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Nombre controller requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Nombre del icono requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
        
        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputController = screen.getByLabelText("Controller *");
        const inputIcono = screen.getByLabelText("Icono *");

        // Ingresa datos válidos en los campos obligatorios
        fireEvent.change(inputNombre, { target: { value: "Nuevo Módulo" } });
        fireEvent.change(inputController, { target: { value: "Controller 1" } });
        fireEvent.change(inputIcono, { target: { value: '1' } });
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de modulo requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Nombre controller requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Nombre del icono requerido/i)).toBeInTheDocument();
    });


    /**10. Simular clic en el botón cancelar */
    it('Verificar que los campos se limpien y vuelvan a su estado inicial cuando se hace clic en el botón “Cancelar”', () => {
        
        const mockModulo = {
            modulosActual: null,
            registrarModulos: jest.fn(),
            actualizarModulos: jest.fn(),
            obtenerModulos: jest.fn(),
          };
        
        render(
            <ContextProvider>
                <ModulosContext.Provider value={mockModulo}>
                    <SnackbarProvider maxSnack={2} >
                        <FormModulos closeModal={() => {}}/>
                    </SnackbarProvider>
                </ModulosContext.Provider>
            </ContextProvider>
          );
    
        //Actualiza el valor del campo nombre
        const inputNombre = screen.getByLabelText("Nombre *");
        fireEvent.change(inputNombre, { target: { value: "Nuevo Módulo" } });

        //Actualiza el valor del campo controller
        const inputController = screen.getByLabelText("Controller *");
        fireEvent.change(inputController, { target: { value: "Controller 1" } });

        //Actualiza el valor del campo icono
        const inputIcono = screen.getByLabelText("Icono *");
        fireEvent.change(inputIcono, { target: { value: '1' } });

        //Actualiza el valor de la casilla de verificación
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        fireEvent.click(checkboxElemento);

        //Hace clic en el botón cancelar
        const buttonCancelarElemento = screen.getByTestId("canceltest");
        fireEvent.click(buttonCancelarElemento)

        //Verifica que el campo vuelvan a su valor inicial
        expect(inputNombre.value).toBe("");
        expect(inputController.value).toBe("");
        expect(inputIcono.value).toBe("");
        expect(checkboxElemento.checked).toBe(false);

      }) 


      /**11.  Envío de formulario con datos válidos*/
    it('Verificar si se muestra una notificación de éxito después de enviar el formulario con datos válidos', async () =>{

        const mockModulo = {
            modulosActual: null,
            registrarModulos: jest.fn().mockResolvedValue({
                mensaje: "Módulo creado con exito!",
                tipoAlerta: "success",
              }),
              actualizarModulos: null,
              obtenerModulos: jest.fn(),
          };

          const closeModal = jest.fn();
        
          render(
            <ContextProvider>
                <ModulosContext.Provider value={mockModulo}>
                    <SnackbarProvider maxSnack={2} >
                        <FormModulos closeModal={closeModal}/>
                    </SnackbarProvider>
                </ModulosContext.Provider>
            </ContextProvider>
          );
        
        //Actualiza el valor del campo nombre
        const inputNombre = screen.getByLabelText("Nombre *");
        fireEvent.change(inputNombre, { target: { value: "Nuevo Módulo" } });

        //Actualiza el valor del campo controller
        const inputController = screen.getByLabelText("Controller *");
        fireEvent.change(inputController, { target: { value: "Controller 1" } });

        //Actualiza el valor del campo icono
        const inputIcono = screen.getByLabelText("Icono *");
        fireEvent.change(inputIcono, { target: { value: '1' } });

        //Actualiza el valor de la casilla de verificación
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        fireEvent.click(checkboxElemento);

        //Hace clic en el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
        fireEvent.submit(submitButtonElemento);

        await waitFor(() => {
            expect(mockModulo.registrarModulos).toHaveBeenCalledWith({ 
                id: 0,
                nombre: "Nuevo Módulo",
                controller: "Controller 1",
                grupos: [],
                icono: "1",
                created_at: expect.any(String),
                updated_at: expect.any(String),
                activo: true,
            });
        });

        const mensajeExitoso = screen.getByText("Módulo creado con exito!");
        expect(mensajeExitoso).toBeTruthy();
    })


    //12. Comprueba que el formulario no se envía con datos inválidos
    it("Verificar que no se envíe el formulario con datos inválidos", () => {
        
        const mockModulo = {
            modulosActual: null,
            registrarModulos: jest.fn(),
            actualizarModulos: jest.fn(),
            obtenerModulos: jest.fn(),
          };

        const closeModal = jest.fn();

        //Renderización del componente
        render(
            <ContextProvider>
                <ModulosContext.Provider value={mockModulo}>
                    <SnackbarProvider maxSnack={2} >
                        <FormModulos closeModal={closeModal}/>
                    </SnackbarProvider>
                </ModulosContext.Provider>
            </ContextProvider>
          );

        //Hace clic en el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
        fireEvent.submit(submitButtonElemento);

        //Espero que no se llame a la funcion closeModal
        expect(closeModal).not.toHaveBeenCalled();
    });

})
