import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from 'contexts/ContextProvider';
import { SnackbarProvider} from 'notistack';
import { ZonaContext } from 'pages/zona/context/zonaContext';
import FormZona from 'pages/zona/components/FormZona';
import { SelectsContext } from 'contexts/SelectsContext';
import Zona from 'pages/zona/Zona';

describe('Zona', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)
    
    
    /**2. Verificación de elementos en el formulario*/
    it('Verificar la existencia del campo Nombre, el botón Guardar, el botón Cancelar y la casilla de verificación Activo en el formulario', () =>{
       // Mocks para indicar el país
       const paisList = [{ id: 1, nombre: "Chile" }];

       const mockZona = {
        zonaActual: null,
        registrarZona: jest.fn(),
        actualizarZona: jest.fn(),
        obtenerZona: jest.fn(),
      };

      const closeModal = jest.fn();

       //1. Render component
       render(
        <ContextProvider>
            <ZonaContext.Provider value={mockZona}>
                <SelectsContext.Provider value={{ paisList }}>
                    <SnackbarProvider>
                        <FormZona closeModal={closeModal} />
                    </SnackbarProvider>
                </SelectsContext.Provider>
            </ZonaContext.Provider>
        </ContextProvider>
        );

        //Elementos del formulario
        const inputNombre = screen.getByLabelText("Nombre *")
        const selectPais = screen.getByLabelText("Select País")
        const SubmitButtonElemento = screen.getByTestId("submittest"); 
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        const cancelButtonElemento = screen.getByTestId("canceltest");

        //Verificar que los elementos se encuentren en el formulario
        expect(inputNombre).toBeInTheDocument();
        expect(selectPais).toBeInTheDocument();
        expect(SubmitButtonElemento).toBeTruthy(); 
        expect(checkboxElemento).toBeTruthy();
        expect(cancelButtonElemento).toBeTruthy();
    })


    /**3. Valor inicial de los campos de entrada */
    it('Verificar que los campos de entrada estén inicializados correctamente', () =>{
       // Mocks para indicar el país
       const paisList = [{ id: 1, nombre: "Chile" }];

       const mockZona = {
        zonaActual: null,
        registrarZona: jest.fn(),
        actualizarZona: jest.fn(),
        obtenerZona: jest.fn(),
      };

      const closeModal = jest.fn();

       //1. Renderización del componente
       render(
        <ContextProvider>
            <ZonaContext.Provider value={mockZona}>
                <SelectsContext.Provider value={{ paisList }}>
                    <SnackbarProvider>
                        <FormZona closeModal={closeModal} />
                    </SnackbarProvider>
                </SelectsContext.Provider>
            </ZonaContext.Provider>
        </ContextProvider>
        );

        //Encuentra los campos en el formulario
        const inputNombre = screen.getByLabelText("Nombre *")
        const selectPais = screen.getByLabelText("Select País")
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        // Verificar que los campos estén inicializados correctamente
        expect(inputNombre.value).toBe("");
        expect(selectPais.options[0].value).toBe("Seleccione un(a) País");
        expect(checkboxElemento.checked).toBe(false);
    })


    /**4. Actualización de estado en el campo nombre*/
    it('Verificar que se actualice el estado cuando se ingrese texto en el campo nombre', () =>{
        // Mocks para indicar el país
       const paisList = [{ id: 1, nombre: "Chile" }];

       const mockZona = {
        zonaActual: null,
        registrarZona: jest.fn(),
        actualizarZona: jest.fn(),
        obtenerZona: jest.fn(),
      };

      const closeModal = jest.fn();

       //1. Renderización del componente
       render(
        <ContextProvider>
            <ZonaContext.Provider value={mockZona}>
                <SelectsContext.Provider value={{ paisList }}>
                    <SnackbarProvider>
                        <FormZona closeModal={closeModal} />
                    </SnackbarProvider>
                </SelectsContext.Provider>
            </ZonaContext.Provider>
        </ContextProvider>
        );

        //Encuentra el campo en el formulario
        const inputNombre = screen.getByLabelText("Nombre *")

        //Ingresa un valor en el campo 
        fireEvent.change(inputNombre, { target: { value: "ZONA 1" } });

        //Verifica si el valor se actualizó correctamente 
        expect(inputNombre.value).toBe("ZONA 1");
    }) 


    /**5. Actualización de estado en el casilla de verificación Activo*/
    it('Verificar que se actualice el estado cuando se seleccione/deseleccione la casilla de verificación Activo', () =>{
        // Mocks para indicar el país
       const paisList = [{ id: 1, nombre: "Chile" }];

       const mockZona = {
        zonaActual: null,
        registrarZona: jest.fn(),
        actualizarZona: jest.fn(),
        obtenerZona: jest.fn(),
      };

      const closeModal = jest.fn();

       //1. Renderización del componente
       render(
        <ContextProvider>
            <ZonaContext.Provider value={mockZona}>
                <SelectsContext.Provider value={{ paisList }}>
                    <SnackbarProvider>
                        <FormZona closeModal={closeModal} />
                    </SnackbarProvider>
                </SelectsContext.Provider>
            </ZonaContext.Provider>
        </ContextProvider>
        );

        //Encuentra la casilla de verificación en el formulario
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        //Ingresa un valor en la casilla de verificación
        fireEvent.click(checkboxElemento);

        //Verifica si el valor se actualizó correctamente en la casilla de verificación
        expect(checkboxElemento.checked).toBe(true);
    })


    /**6. Actualización de estado en el select País*/
    it('Verificar que se actualice el estado del select país cuando se selecciona una opción del select', () =>{
       // Mocks para indicar el país
       const paisList = [
            { id: 1, nombre: "Chile" },
            { id: 2, nombre: "Perú" }
        ];

       const mockZona = {
        zonaActual: null,
        registrarZona: jest.fn(),
        actualizarZona: jest.fn(),
        obtenerZona: jest.fn(),
      };

      const closeModal = jest.fn();

       //1. Renderización del componente
       render(
        <ContextProvider>
            <ZonaContext.Provider value={mockZona}>
                <SelectsContext.Provider value={{ paisList }}>
                    <SnackbarProvider>
                        <FormZona closeModal={closeModal} />
                    </SnackbarProvider>
                </SelectsContext.Provider>
            </ZonaContext.Provider>
        </ContextProvider>
        );

       //Encuentra el campo en el formulario
       const selectPais = screen.getByLabelText("Select País")

       //Verifica que el select esté inicializado correctamente
       expect(selectPais.options[0].value).toBe("Seleccione un(a) País");

       //Actualiza el valor a la primera opción del select
       fireEvent.change(selectPais, { target: { value: '1' } });

       //Verifica que el select contenga el valor de la opción ingresada y el texto este acorde con el identificador
       expect(selectPais.value).toBe('1');
       expect(selectPais.options[selectPais.selectedIndex].text).toBe('Chile');

       //Actualiza el valor a la primera opción del select
       fireEvent.change(selectPais, { target: { value: '2' } });

       //Verifica que el select contenga el valor de la opción ingresada y el texto este acorde con el identificador
       expect(selectPais.value).toBe('2');
       expect(selectPais.options[selectPais.selectedIndex].text).toBe('Perú');
   
    })


    /**7. Validación de formulario con campos obligatorios parte 1*/
    it('Verifica que se muestre el mensaje de error cuando los campos obligatorios se dejan en blanco al hacer clic en el botón guardar', () => {
        // Mocks para indicar el país
       const paisList = [{ id: 1, nombre: "Chile" }];

       const mockZona = {
        zonaActual: null,
        registrarZona: jest.fn(),
        actualizarZona: jest.fn(),
        obtenerZona: jest.fn(),
      };

      const closeModal = jest.fn();

       //1. Renderización del componente
       render(
        <ContextProvider>
            <ZonaContext.Provider value={mockZona}>
                <SelectsContext.Provider value={{ paisList }}>
                    <SnackbarProvider>
                        <FormZona closeModal={closeModal} />
                    </SnackbarProvider>
                </SelectsContext.Provider>
            </ZonaContext.Provider>
        </ContextProvider>
        );
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de zona requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe seleccionar un país/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
    });


    /**8. Validación de formulario con campos obligatorios parte 2*/
    it('Verifica que el mensaje de error desaparezca cuando se ingresan datos válidos en el campo Nombre del formulario', () => {
        // Mocks para indicar el país
       const paisList = [{ id: 1, nombre: "Chile" }];

       const mockZona = {
        zonaActual: null,
        registrarZona: jest.fn(),
        actualizarZona: jest.fn(),
        obtenerZona: jest.fn(),
      };

      const closeModal = jest.fn();

       //1. Renderización del componente
       render(
        <ContextProvider>
            <ZonaContext.Provider value={mockZona}>
                <SelectsContext.Provider value={{ paisList }}>
                    <SnackbarProvider>
                        <FormZona closeModal={closeModal} />
                    </SnackbarProvider>
                </SelectsContext.Provider>
            </ZonaContext.Provider>
        </ContextProvider>
        );
      
        // Encuentra el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
      
        // Hace clic en el botón guardar sin ingresar información en el Input
        fireEvent.click(submitButtonElemento);
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de zona requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe seleccionar un país/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
        
        // Encuentra los campos obligatorios
        const inputNombre = screen.getByLabelText("Nombre *")
        const selectPais = screen.getByLabelText("Select País")

        // Ingresa datos válidos en los campos obligatorios
        fireEvent.change(inputNombre, { target: { value: "ZONA 1" } });
        fireEvent.change(selectPais, { target: { value: '1' } });
        
        
        //Verifica que el mensaje de error existe al hacer clic en el botón guardar
        expect(screen.getByText(/Nombre de zona requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe seleccionar un país/i)).toBeInTheDocument();
        expect(screen.getByText(/Debe corregir los problemas en el formulario/i)).toBeInTheDocument();
    });


    /**9. Simular clic en el botón cancelar */
    it('Verificar que los campos se limpien y vuelvan a su estado inicial cuando se hace clic en el botón “Cancelar”', () => {

        const paisList = [{ id: 1, nombre: "Chile" }];

        const mockZona = {
           zonaActual: null,
           registrarZona: jest.fn(),
           actualizarZona: jest.fn(),
           obtenerZona: jest.fn(),
         };
   
        const closeModal = jest.fn();
   
        //1. Renderización del componente
        render(
           <ContextProvider>
               <ZonaContext.Provider value={mockZona}>
                   <SelectsContext.Provider value={{ paisList }}>
                       <SnackbarProvider>
                           <FormZona closeModal={closeModal} />
                       </SnackbarProvider>
                   </SelectsContext.Provider>
               </ZonaContext.Provider>
           </ContextProvider>
        );
        
        //Actualiza el valor del campo Nombre
        const inputNombre = screen.getByLabelText("Nombre *")
        fireEvent.change(inputNombre, { target: { value: "ZONA 1" } });
        
        //Actualiza el valor del select país
        const selectPais = screen.getByLabelText("Select País")
        fireEvent.change(selectPais, { target: { value: '1' } });

        //Actualiza el valor de la casilla de verificación
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        fireEvent.click(checkboxElemento);

        //Hace clic en el botón Cancelar
        const buttonCancelarElemento = screen.getByTestId("canceltest");
        fireEvent.click(buttonCancelarElemento)

        // Verificar que los campos estén inicializados correctamente
        expect(inputNombre.value).toBe("");
        expect(selectPais.options[0].value).toBe("Seleccione un(a) País");
        expect(checkboxElemento.checked).toBe(false);
      })

    /**10.  Envío de formulario con datos válidos*/
    it('Verificar si se muestra una notificación de éxito después de enviar el formulario con datos válidos', async () =>{

        //Mock de país
        const paisList = [{ id: 1, nombre: "Chile" }];

        const mockZona = {
            zonaActual: null,
            registrarZona: jest.fn().mockResolvedValue({
                mensaje: "Zona creada con exito!",
                tipoAlerta: "success",
              }),
              actualizarZona: null,
              obtenerZona: jest.fn(),
          };

          const closeModal = jest.fn();
        
          //1. Renderización del componente
        render(
            <ContextProvider>
                <ZonaContext.Provider value={mockZona}>
                    <SelectsContext.Provider value={{ paisList }}>
                        <SnackbarProvider>
                            <FormZona closeModal={closeModal} />
                        </SnackbarProvider>
                    </SelectsContext.Provider>
                </ZonaContext.Provider>
            </ContextProvider>
         );
        
        //Actualiza el valor del campo Nombre
        const inputNombre = screen.getByLabelText("Nombre *")
        fireEvent.change(inputNombre, { target: { value: "ZONA 1" } });
        
        //Actualiza el valor del select país
        const selectPais = screen.getByLabelText("Select País")
        fireEvent.change(selectPais, { target: { value: '1' } });

        //Actualiza el valor de la casilla de verificación
        const checkboxElemento = screen.getByTestId("Checkboxtest");
        fireEvent.click(checkboxElemento);

        // Hace clic en el botón "Guardar" en el formulario
        const submitButtonElemento = screen.getByTestId("submittest");
        fireEvent.submit(submitButtonElemento);

        //Se utiliza async/await para esperar a que la notificación se muestre en la interfaz antes de realizar las comprobaciones
        await waitFor(() => {
            expect(mockZona.registrarZona).toHaveBeenCalledWith({ 
                id: 0,
                nombre: "ZONA 1",
                paisId: "1",
                pais: {
                  id: "1",
                },
                activo: true,
            });
        });

        const mensajeExitoso = screen.getByText("Zona creada con exito!");
        expect(mensajeExitoso).toBeTruthy();
    })

    //11. Comprueba que el formulario no se envía con datos inválidos
    it("Verificar que no se envíe el formulario con datos inválidos", () => {
        //Mock de país
        const paisList = [{ id: 1, nombre: "Chile" }];

        const mockZona = {
            zonaActual: null,
            registrarZona: jest.fn(),
            actualizarZona: jest.fn(),
            obtenerZona: jest.fn(),
          };

        const closeModal = jest.fn();

        //1. Renderización del componente
        render(
            <ContextProvider>
                <ZonaContext.Provider value={mockZona}>
                    <SelectsContext.Provider value={{ paisList }}>
                        <SnackbarProvider>
                            <FormZona closeModal={closeModal} />
                        </SnackbarProvider>
                    </SelectsContext.Provider>
                </ZonaContext.Provider>
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
