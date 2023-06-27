import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaFlotas from 'pages/flotas/components/TablaFlotas';
import { ContextProvider } from 'contexts/ContextProvider';
import { FlotaContext } from 'pages/flotas/context/flotaContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Tabla Flota', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockFlotaList = [
            { id: 1, nombre: "Flota 1", activo: true },
            { id: 2, nombre: "Flota 2", activo: false },
          ];
        
        const obtenerFlotas = jest.fn()
        const obtenerFlota = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < FlotaContext.Provider value={{ flotaList: mockFlotaList, obtenerFlota, obtenerFlotas }}>
                    <TablaFlotas openModal={() => {}}/>
                </FlotaContext.Provider>
            </ContextProvider>
        )
        
        screen.debug()
        // Verificar que las columnas se muestren correctamente en la tabla
        expect(screen.getByText("Id")).toBeInTheDocument();
        expect(screen.getByText("Nombre")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
        expect(screen.getByText("Acciones")).toBeInTheDocument();
    
    })

    //**3. Valores de la columna "Activo" */
    it('Verifica que la columna “Activo” muestre los botones con un “SI” o “NO” según el valor de la propiedad “Activo” de cada fila. ', () => {

        const mockFlotaList = [
            { id: 1, nombre: "Flota 1", activo: true },
            { id: 2, nombre: "Flota 2", activo: false },
          ];
        
        const obtenerFlotas = jest.fn()
        const obtenerFlota = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < FlotaContext.Provider value={{ flotaList: mockFlotaList, obtenerFlota, obtenerFlotas }}>
                    <TablaFlotas openModal={() => {}}/>
                </FlotaContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockFlotaList[0].activo
        const segundoActivoFalse = mockFlotaList[1].activo

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

    //**4. Renderización del formulario" */
    it('Verificar que al hacer clic en el icono editar se muestre el formulario', () =>{
        const mockFlotaList = [
            { id: 1, nombre: "Flota 1", activo: true },
            { id: 2, nombre: "Flota 2", activo: false },
          ];
        
        const obtenerFlotas = jest.fn().mockResolvedValue();
        const obtenerFlota = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < FlotaContext.Provider value={{ flotaList: mockFlotaList, obtenerFlota, obtenerFlotas }}>
                    <TablaFlotas openModal={openModalMock}/>
                </FlotaContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerFlota).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**4. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockFlotaList = [
            { id: 1, nombre: "Flota 1", activo: true },
            { id: 2, nombre: "Flota 2", activo: false },
            { id: 3, nombre: "Flota 3", activo: true },
          ];
        
        const obtenerFlotas = jest.fn().mockResolvedValue(mockFlotaList);
        const obtenerFlota = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < FlotaContext.Provider value={{ flotaList: mockFlotaList, obtenerFlota, obtenerFlotas }}>
                    <TablaFlotas openModal={openModalMock}/>
                </FlotaContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockFlotaList.length +1);
    })


    /** No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockFlotaValue = {
            FlotaList: [],
            obtenerFlota: jest.fn(),
            obtenerFlotas: jest.fn(),
        };
        const { getByText } = render(
            <FlotaContext.Provider value={mockFlotaValue}>
                <TablaFlotas />
            </FlotaContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /**Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="flota" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})