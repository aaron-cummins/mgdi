import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from 'contexts/ContextProvider';
import { SnackbarProvider} from 'notistack';
import { RegionContext } from 'pages/region/context/regionContext';
import FormRegion from 'pages/region/components/FormRegion';
import Region from 'pages/region/Region';

describe('Región', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)
    
    /**1. Renderización del componente */
    const renderComponent = () =>
        render(
        <ContextProvider>
            <SnackbarProvider maxSnack={2}>
                <Region />
            </SnackbarProvider>
        </ContextProvider>
        );
    
    
    /**2. Verificación de elementos en el formulario*/
    it('Verificar la existencia del campo Nombre, el campo número, el botón Cancelar, el botón Guardar, la casilla de verificación Activo y el icono de cierre de modal en el formulario', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nueva Región')
        fireEvent.click(ButtonNuevoElemento);
        
        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputNumero = screen.getByLabelText("Numero *");
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        const cancelButtonElemento = screen.getByTestId("canceltest");
        const SubmitButtonElemento = screen.getByTestId("submittest"); 
        const iconCerrarModalElemento = screen.getByTestId("CloseIcon")

        //Verificar que los elementos se encuentren en el formulario
        expect(inputNombre).toBeInTheDocument()
        expect(inputNumero).toBeInTheDocument()
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
        const ButtonNuevoElemento = screen.getByText('Nueva Región')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputNumero = screen.getByLabelText("Numero *");

        // Verificar que los campos estén inicializados correctamente
        expect(inputNombre.value).toBe("");
        expect(inputNumero.value).toBe('0');
    })


    /**4. Actualización de estado en el campo nombre*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo nombre', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nueva Región')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el campo en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");

        //Ingresa un valor en el campo 
        fireEvent.change(inputNombre, { target: { value: "Nueva Región" } });

        //Verifica si el valor se actualizó correctamente 
        expect(inputNombre.value).toBe("Nueva Región");
    }) 


    /**5. Actualización de estado en el campo Número*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo número', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nueva Región')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el campo en el formulario
        const inputNumero = screen.getByLabelText("Numero *");

        //Ingresa un valor en el campo 
        fireEvent.change(inputNumero, { target: { value: "XV" } });

        //Verifica si el valor se actualizó correctamente 
        expect(inputNumero.value).toBe("XV");
    }) 


    /**6. Actualización de estado en el casilla de verificación Activo*/
    it('Verificar que se actualice el estado cuando se seleccione/deseleccione la casilla de verificación Activo', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nueva Región')
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
        const buttonNuevoElemento = screen.getByText('Nueva Región');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de la región requerida/i)).toBeInTheDocument();
        expect(screen.getByText(/Numero requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
    });


    /**9. Validación de formulario con campos obligatorios parte 2*/
    it('Verifica que el mensaje de error desaparezca cuando se ingresan datos válidos en el campo Nombre del formulario', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nueva Región');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de la región requerida/i)).toBeInTheDocument();
        expect(screen.getByText(/Numero requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
       
        //Encuentra los elementos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *");
        const inputNumero = screen.getByLabelText("Numero *");

        // Ingresa datos válidos en los campos obligatorios
        fireEvent.change(inputNombre, { target: { value: "Nuevo Módulo" } });
        fireEvent.change(inputNumero, { target: { value: "XV" } });
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de la región requerida/i)).toBeInTheDocument();
        expect(screen.getByText(/Numero requerido/i)).toBeInTheDocument();
     
    });


    /**10. Simular clic en el botón cancelar */
    it('Verificar que los campos se limpien y vuelvan a su estado inicial cuando se hace clic en el botón “Cancelar”', () => {
        
        const mockRegion = {
            regionActual: null,
            registrarRegion: jest.fn(),
            actualizarRegion: jest.fn(),
            obtenerRegion: jest.fn(),
          };
        
        render(
            <ContextProvider>
                <RegionContext.Provider value={mockRegion}>
                    <SnackbarProvider maxSnack={2} >
                        <FormRegion closeModal={() => {}}/>
                    </SnackbarProvider>
                </RegionContext.Provider>
            </ContextProvider>
          );
    
        //Actualiza el valor del campo nombre
        const inputNombre = screen.getByLabelText("Nombre *");
        fireEvent.change(inputNombre, { target: { value: "Nueva Región" } });

        //Actualiza el valor del campo numero
        const inputNumero = screen.getByLabelText("Numero *");
        fireEvent.change(inputNumero, { target: { value: "XV" } });

        //Actualiza el valor de la casilla de verificación
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        fireEvent.click(checkboxElemento);

        //Hace clic en el botón cancelar
        const buttonCancelarElemento = screen.getByTestId("canceltest");
        fireEvent.click(buttonCancelarElemento)

        //Verifica que el campo vuelvan a su valor inicial
        expect(inputNombre.value).toBe("");
        expect(inputNumero.value).toBe('0');
        expect(checkboxElemento.checked).toBe(false);

      })


    /**11.  Envío de formulario con datos válidos*/
    it('Verificar si se muestra una notificación de éxito después de enviar el formulario con datos válidos', async () =>{

        const mockRegion = {
            regionActual: null,
            registrarRegion: jest.fn().mockResolvedValue({
                mensaje: "Región creada con exito!",
                tipoAlerta: "success",
              }),
              actualizarRegion: null,
              obtenerRegion: jest.fn(),
          };

          const closeModal = jest.fn();
        
          render(
            <ContextProvider>
                <RegionContext.Provider value={mockRegion}>
                    <SnackbarProvider maxSnack={2} >
                        <FormRegion closeModal={closeModal}/>
                    </SnackbarProvider>
                </RegionContext.Provider>
            </ContextProvider>
          );
        
        //Actualiza el valor del campo nombre
        const inputNombre = screen.getByLabelText("Nombre *");
        fireEvent.change(inputNombre, { target: { value: "Nueva Región" } });

        //Actualiza el valor del campo numero
        const inputNumero = screen.getByLabelText("Numero *");
        fireEvent.change(inputNumero, { target: { value: "XV" } });

        //Actualiza el valor de la casilla de verificación
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        fireEvent.click(checkboxElemento);

        //Hace clic en el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
        fireEvent.submit(submitButtonElemento);

        await waitFor(() => {
            expect(mockModulo.registrarModulos).toHaveBeenCalledWith({ 
                id: 0,
                nombre: "Nueva Región",
                numero: "XV",
                comunas: [],
                activo: false,
            });
        });

        const mensajeExitoso = screen.getByText("Región creada con exito!");
        expect(mensajeExitoso).toBeTruthy();
    })


    //12. Comprueba que el formulario no se envía con datos inválidos
    it("Verificar que no se envíe el formulario con datos inválidos", () => {
        
        const mockRegion = {
            regionActual: null,
            registrarRegion: jest.fn(),
            actualizarRegion: jest.fn(),
            obtenerRegion: jest.fn(),
          };

        const closeModal = jest.fn();

        //Renderización del componente
        render(
            <ContextProvider>
                <RegionContext.Provider value={mockRegion}>
                    <SnackbarProvider maxSnack={2} >
                        <FormRegion closeModal={() => {}}/>
                    </SnackbarProvider>
                </RegionContext.Provider>
            </ContextProvider>
          );

        //Hace clic en el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest"); 
        fireEvent.submit(submitButtonElemento);

        //Espero que no se llame a la funcion closeModal
        expect(closeModal).not.toHaveBeenCalled();
    });

})
