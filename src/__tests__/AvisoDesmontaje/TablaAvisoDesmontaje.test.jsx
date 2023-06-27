import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaAvisoDesmontaje from 'pages/avisoDesmontaje/components/TablaAvisoDesmontaje';
import { ContextProvider } from 'contexts/ContextProvider';
import { AvisoDesmontajeContext } from 'pages/avisoDesmontaje/context/avisoDesmontajeContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Aviso desmontaje', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Fecha", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockAvisoDesmontaje = [
            { id: 1, nombre: "Cargo 1", fecha: "2023-12-12", activo: true },
            { id: 2, nombre: "Cargo 2", fecha: "2023-12-12", activo: true },
          ];
        
        const obtenerAvisoDesmontaje = jest.fn()
        const obtenerAvisoDesmontajes = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <AvisoDesmontajeContext.Provider value={{ avisoDesmontajeList: mockAvisoDesmontaje, obtenerAvisoDesmontaje, obtenerAvisoDesmontajes}}>
                    <TablaAvisoDesmontaje openModal={() => {}}/>
                </AvisoDesmontajeContext.Provider>
            </ContextProvider>
        )
        
        // Verificar que las columnas se muestren correctamente en la tabla
        expect(screen.getByText("Id")).toBeInTheDocument();
        expect(screen.getByText("Nombre")).toBeInTheDocument();
        expect(screen.getByText("Fecha")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
        expect(screen.getByText("Acciones")).toBeInTheDocument();
    
    })
    
    //**3. Valores de la columna "Activo" */
    it('Verifica que la columna “Activo” muestre los botones con un “SI” o “NO” según el valor de la propiedad “Activo” de cada fila. ', () => {

        const mockAvisoDesmontaje = [
            { id: 1, nombre: "Cargo 1", fecha: "2023-12-12", activo: true },
            { id: 2, nombre: "Cargo 2", fecha: "2023-12-12", activo: false },
          ];
        
        const obtenerAvisoDesmontaje = jest.fn()
        const obtenerAvisoDesmontajes = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <AvisoDesmontajeContext.Provider value={{ avisoDesmontajeList: mockAvisoDesmontaje, obtenerAvisoDesmontaje, obtenerAvisoDesmontajes}}>
                    <TablaAvisoDesmontaje openModal={() => {}}/>
                </AvisoDesmontajeContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockAvisoDesmontaje[0].activo
        const segundoActivoFalse = mockAvisoDesmontaje[1].activo

        //Obtiene el valor "SI" y "NO"
        const primerActivoButton = screen.getByText("SI");
        const segundoActivoButton = screen.getByText("NO")

        //Verifica que el valor true muestre el valor SI en la columna Activo
        if (primerActivoTrue) {
            expect(primerActivoButton).toBeInTheDocument()
        }

        //Verifica que el valor false muestre el valor No en la columna Activo
        if (!segundoActivoFalse) {
            expect(segundoActivoButton).toBeInTheDocument()
        }
    })

   /**4. Renderización del formulario" */
    it('Verificar que al hacer clic en el icono editar se muestre el formulario', async () =>{
        const mockAvisoDesmontaje = [
            { id: 1, nombre: "Cargo 1", fecha: "2023-12-12", activo: true },
            { id: 2, nombre: "Cargo 2", fecha: "2023-12-12", activo: false },
          ];
        
        const obtenerAvisoDesmontaje = jest.fn().mockResolvedValue();
        const obtenerAvisoDesmontajes = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <AvisoDesmontajeContext.Provider value={{ avisoDesmontajeList: mockAvisoDesmontaje, obtenerAvisoDesmontaje, obtenerAvisoDesmontajes}}>
                    <TablaAvisoDesmontaje openModal={openModalMock}/>
                </AvisoDesmontajeContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerAvisoDesmontaje).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {

        const mockAvisoDesmontaje = [
            { id: 1, nombre: "Cargo 1", fecha: "2023-12-12", activo: true },
            { id: 2, nombre: "Cargo 2", fecha: "2023-12-12", activo: false },
            { id: 3, nombre: "Cargo 3", fecha: "2023-12-12", activo: false },
          ];
        
        const obtenerAvisoDesmontajes = jest.fn().mockResolvedValue(mockAvisoDesmontaje);
        const obtenerAvisoDesmontaje = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <AvisoDesmontajeContext.Provider value={{ avisoDesmontajeList: mockAvisoDesmontaje, obtenerAvisoDesmontaje, obtenerAvisoDesmontajes}}>
                    <TablaAvisoDesmontaje openModal={openModalMock}/>
                </AvisoDesmontajeContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockAvisoDesmontaje.length +1);
    })

    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockAvisoDesmontajeValue = {
            avisoDesmontajeList: [],
            obtenerAvisoDesmontaje: jest.fn(),
            obtenerAvisoDesmontajes: jest.fn(),
        };
        const { getByText } = render(
            <AvisoDesmontajeContext.Provider value={mockAvisoDesmontajeValue}>
                <TablaAvisoDesmontaje />
            </AvisoDesmontajeContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });

    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="aviso desmontaje" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})