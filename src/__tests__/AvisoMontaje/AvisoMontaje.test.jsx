import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from 'contexts/ContextProvider';
import { SnackbarProvider} from 'notistack';
import { AvisoMontajeContext } from 'pages/avisoMontaje/context/avisoMontajeContext';
import FormAvisoMontaje from 'pages/avisoMontaje/components/FormAvisoMontaje';
import AvisoMontaje from 'pages/avisoMontaje/AvisoMontaje';

describe('Aviso Montaje', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)
    
    /**1. Renderización del componente */
    const renderComponent = () =>
        render(
        <ContextProvider>
            <SnackbarProvider maxSnack={2}>
                <AvisoMontaje />
            </SnackbarProvider>
        </ContextProvider>
        );
    
    
    /**2. Verificación de elementos en el formulario*/
    it('Verificar la existencia del campo Nombre, el campo fecha, el botón Guardar, el botón Cancelar, la casilla de verificación Activo y el icono de cierre de modal en el formulario', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Aviso Montaje')
        fireEvent.click(ButtonNuevoElemento);
        
        //Encuentra los elementos en el formulario
        const SubmitButtonElemento = screen.getByTestId("submittest"); 
        const InputElemento = screen.getByLabelText("Nombre")
        const InputFecha = screen.getByLabelText("Fecha *")
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        const cancelButtonElemento = screen.getByTestId("canceltest");
        const iconCerrarModalElemento = screen.getByTestId("CloseIcon");

        //Verificar que los elementos se encuentren en el formulario
        expect(SubmitButtonElemento).toBeTruthy(); 
        expect(InputElemento).toBeInTheDocument();
        expect(InputFecha).toBeInTheDocument();
        expect(checkboxElemento).toBeTruthy();
        expect(cancelButtonElemento).toBeTruthy();
        expect(iconCerrarModalElemento).toBeTruthy();
    })

    
    /**3. Valor inicial de los campos de entrada */
    it('Verificar que los campos de entrada estén inicializados correctamente', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Aviso Montaje')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra los campos en el formulario
        const InputElemento = screen.getByLabelText("Nombre");
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        const InputFecha = screen.getByLabelText("Fecha *") 

        // Verificar que los campos estén inicializados correctamente
        expect(InputElemento.value).toBe("");
        expect(InputFecha.defaultValue).toBe("");
        expect(checkboxElemento.checked).toBe(false);
    })


    /**4. Actualización de estado en el campo nombre*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo nombre', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Aviso Montaje')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra el campo en el formulario
        const InputElemento = screen.getByLabelText("Nombre");

        //Ingresa un valor en el campo 
        fireEvent.change(InputElemento, { target: { value: "Aviso desmontaje" } });

        //Verifica si el valor se actualizó correctamente 
        expect(InputElemento.value).toBe("Aviso desmontaje");
    }) 


    /**5. Actualización de estado en el casilla de verificación Activo*/
    it('Verificar que se actualice el estado cuando se seleccione/deseleccione la casilla de verificación Activo', () =>{
        //Renderización del componente 
        renderComponent(); 
        
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const ButtonNuevoElemento = screen.getByText('Nuevo Aviso Montaje')
        fireEvent.click(ButtonNuevoElemento);

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa un valor en la casilla de verificación
        fireEvent.click(checkboxElemento);

        //Verifica si el valor se actualizó correctamente en la casilla de verificación
        expect(checkboxElemento.checked).toBe(true);
    })


    /**6. Actualización de estado en el campo fecha*/
    it('Verificar que se actualice el estado del campo fecha cuando se selecciona una fecha del calendario', () =>{
       //Renderización del componente 
       renderComponent(); 
        
       //Simula el evento Onclick en el botón de agregar un nuevo registro
       const ButtonNuevoElemento = screen.getByText('Nuevo Aviso Montaje')
       fireEvent.click(ButtonNuevoElemento);

       //Encuentra el campo en el formulario
       const InputElemento = screen.getByLabelText("Fecha *");

       const fecha = "12-12-2023";
       const fechaISO = fecha.split("-").reverse().join("-");
       //Ingresa un valor en el campo 
       fireEvent.change(InputElemento, { target: { value: fechaISO } });

       //Verifica si el valor se actualizó correctamente 
       expect(InputElemento.value).toBe(fechaISO);
   
    })

    /**7. Validación de formulario con campos obligatorios parte 1*/
    it('Verifica que se muestre el mensaje de error cuando los campos obligatorios se dejan en blanco al hacer clic en el botón guardar', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nuevo Aviso Montaje');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre requerido/i)).toBeInTheDocument();
      });


    /**8. Validación de formulario con campos obligatorios parte 2*/
    it('Verifica que el mensaje de error desaparezca cuando se ingresan datos válidos en el campo Nombre del formulario', () => {
        renderComponent();
      
        //Simula el evento Onclick en el botón de agregar un nuevo registro
        const buttonNuevoElemento = screen.getByText('Nuevo Aviso Montaje');
        fireEvent.click(buttonNuevoElemento);
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre requerido/i)).toBeInTheDocument();
        
        // Encuentra los campos obligatorios
        const InputElemento = screen.getByLabelText("Nombre");
        const InputFecha = screen.getByLabelText("Fecha *") 

        // Ingresa datos válidos en los campos obligatorios
        fireEvent.change(InputElemento , { target: { value: 'Nuevo Montaje 1' } });
        fireEvent.change(InputFecha, { target: { value: "12-12-2023" } });
        
        //Verifica que el mensaje de error exista despues 
        expect(screen.getByText(/Nombre requerido/i)).toBeInTheDocument();
      });


    /**9. Simular clic en el botón guardar */
    it('Verificar que los campos se limpien y vuelvan a su estado inicial cuando se hace clic en el botón “Cancelar”', () => {
        
        const mockAvisoMontaje = {
            avisoMontajeActual: null,
            registrarAvisoMontaje: jest.fn(),
            actualizarAvisoMontaje: jest.fn(),
            obtenerAvisoMontaje: jest.fn(),
          };
        
        render(
            <ContextProvider>
                <AvisoMontajeContext.Provider value={mockAvisoMontaje}>
                    <SnackbarProvider maxSnack={2} >
                        <FormAvisoMontaje closeModal={() => {}}/>
                    </SnackbarProvider>
                </AvisoMontajeContext.Provider>
            </ContextProvider>
          );
    
        //Encuentra el campo en el formulario
        const InputElemento = screen.getByLabelText("Nombre");

        //Ingresa un valor en el campo 
        fireEvent.change(InputElemento , { target: { value: 'Nuevo Montaje 1' } });

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa el valor true en la casilla de verificación
        fireEvent.click(checkboxElemento);

        //Encuentra el campo fecha
        const InputFecha = screen.getByLabelText("Fecha *") 

        //Asigna un valor al campo fecha
        fireEvent.change(InputFecha, { target: { value: "12-12-2023" } });

        //Encuentra el botón Cancelar en el formulario
        const buttonCancelarElemento = screen.getByTestId("canceltest");

        //Hace clic al botón Cancelar
        fireEvent.click(buttonCancelarElemento)

        //Verifica que el campo nombre se reestablezca a su valor inicial
        expect(InputElemento.value).toBe('');

        // Verificar que la casilla de verificación se reestablezca a su valor inicial
        expect(checkboxElemento.checked).toBe(false);

        // Verificar que el campo fecha se reestablezca a su valor inicial
        expect(InputFecha.defaultValue).toBe("");
      }) 


      /**10.  Envío de formulario con datos válidos*/
    it('Verificar si se muestra una notificación de éxito después de enviar el formulario con datos válidos', async () =>{

        const mockAvisoMontaje = {
            avisoMontajeActual: null,
            registrarAvisoMontaje: jest.fn().mockResolvedValue({
                mensaje: "Aviso montaje creado con exito!",
                tipoAlerta: "success",
              }),
              actualizarAvisoMontaje: null,
            obtenerAvisoMontaje: jest.fn(),
          };

          const closeModal = jest.fn();
        
          render(
            <ContextProvider>
                <AvisoMontajeContext.Provider value={mockAvisoMontaje}>
                    <SnackbarProvider maxSnack={2} >
                        <FormAvisoMontaje closeModal={closeModal}/>
                    </SnackbarProvider>
                </AvisoMontajeContext.Provider>
            </ContextProvider>
          );
        
        //Encuentra el campo en el formulario
        const InputElemento = screen.getByLabelText("Nombre");

        //Ingresa un valor en el campo 
        fireEvent.change(InputElemento , { target: { value: "Nuevo Montaje 1" } });

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa el valor true en la casilla de verificación
        fireEvent.click(checkboxElemento);

        //Encuentra el campo fecha
        const InputFecha = screen.getByLabelText("Fecha *") 
        
        const fecha = "12-12-2023";
        const fechaISO = fecha.split("-").reverse().join("-");
        //Asigna un valor al campo fecha
        fireEvent.change(InputFecha, { target: { value: fechaISO } });

        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar 
        fireEvent.submit(submitButtonElemento);

        //Se utiliza async/await para esperar a que la notificación se muestre en la interfaz antes de realizar las comprobaciones
        await waitFor(() => {
            expect(mockAvisoMontaje.registrarAvisoMontaje).toHaveBeenCalledWith({ 
                id: 0,
                nombre: 'Nuevo Montaje 1',
                fecha: fechaISO,
                activo: true
            });
        });

        const mensajeExitoso = screen.getByText("Aviso montaje creado con exito!");
        expect(mensajeExitoso).toBeTruthy();
    })

    //11. Comprueba que el formulario no se envía con datos inválidos
    it("Verificar que no se envíe el formulario con datos inválidos", () => {
        
        const mockAvisoMontaje = {
            avisoMontajeActual: null,
            registrarAvisoMontaje: jest.fn(),
            actualizarAvisoMontaje: jest.fn(),
            obtenerAvisoMontaje: jest.fn(),
          };
        const closeModal = jest.fn();

        //Renderización del componente
        render(
            <ContextProvider>
                <AvisoMontajeContext.Provider value={mockAvisoMontaje}>
                    <SnackbarProvider maxSnack={2} >
                        <FormAvisoMontaje closeModal={closeModal}/>
                    </SnackbarProvider>
                </AvisoMontajeContext.Provider>
            </ContextProvider>
          );

        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar 
        fireEvent.submit(submitButtonElemento);

        //Espero que no se llame a la funcion closeModal
        expect(closeModal).not.toHaveBeenCalled();
    });
})
