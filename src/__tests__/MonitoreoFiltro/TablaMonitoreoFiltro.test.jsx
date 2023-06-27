import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaMonitoreoFiltro from 'pages/monitoreoFiltro/components/TablaMonitoreoFiltro';
import { ContextProvider } from 'contexts/ContextProvider';
import { MonitoreoFiltroContext } from 'pages/monitoreoFiltro/context/monitoreoFiltroContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Monitoreo Filtro', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockMonitoreoFiltroList = [
            { id: 1, nombre: "Monitoreo Filtro 1", activo: true },
            { id: 2, nombre: "Monitoreo Filtro 2", activo: false },
          ];
        
        const obtenerMonitoreoFiltro = jest.fn()
        const obtenerMonitoreoFiltros = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <MonitoreoFiltroContext.Provider value={{ monitoreofiltroList: mockMonitoreoFiltroList, obtenerMonitoreoFiltro, obtenerMonitoreoFiltros}}>
                    <TablaMonitoreoFiltro openModal={() => {}}/>
                </MonitoreoFiltroContext.Provider>
            </ContextProvider>
        )
        
        // Verificar que las columnas se muestren correctamente en la tabla
        expect(screen.getByText("Id")).toBeInTheDocument();
        expect(screen.getByText("Nombre")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
        expect(screen.getByText("Acciones")).toBeInTheDocument();
    
    })

    
    //**3. Valores de la columna "Activo" */
    it('Verifica que la columna “Activo” muestre los botones con un “SI” o “NO” según el valor de la propiedad “Activo” de cada fila. ', () => {

        const mockMonitoreoFiltroList = [
            { id: 1, nombre: "Monitoreo Filtro 1", activo: true },
            { id: 2, nombre: "Monitoreo Filtro 2", activo: false },
          ];
        
        const obtenerMonitoreoFiltro = jest.fn()
        const obtenerMonitoreoFiltros = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <MonitoreoFiltroContext.Provider value={{ monitoreofiltroList: mockMonitoreoFiltroList, obtenerMonitoreoFiltro, obtenerMonitoreoFiltros}}>
                    <TablaMonitoreoFiltro openModal={() => {}}/>
                </MonitoreoFiltroContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockMonitoreoFiltroList[0].activo
        const segundoActivoFalse = mockMonitoreoFiltroList[1].activo

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
    it('Verificar que al hacer clic en el icono editar se muestre el formulario', () =>{
        const mockMonitoreoFiltroList = [
            { id: 1, nombre: "Monitoreo Filtro 1", activo: true },
            { id: 2, nombre: "Monitoreo Filtro 2", activo: false },
          ];
        
        const obtenerMonitoreoFiltros = jest.fn().mockResolvedValue();
        const obtenerMonitoreoFiltro = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <MonitoreoFiltroContext.Provider value={{ monitoreofiltroList: mockMonitoreoFiltroList, obtenerMonitoreoFiltro, obtenerMonitoreoFiltros}}>
                    <TablaMonitoreoFiltro openModal={openModalMock}/>
                </MonitoreoFiltroContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerMonitoreoFiltro).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockMonitoreoFiltroList = [
            { id: 1, nombre: "Monitoreo Filtro 1", activo: true },
            { id: 2, nombre: "Monitoreo Filtro 2", activo: false },
            { id: 3, nombre: "Monitoreo Filtro 3", activo: false },
          ];
        
        const obtenerMonitoreoFiltros = jest.fn().mockResolvedValue(mockMonitoreoFiltroList);
        const obtenerMonitoreoFiltro = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <MonitoreoFiltroContext.Provider value={{ monitoreofiltroList: mockMonitoreoFiltroList, obtenerMonitoreoFiltro, obtenerMonitoreoFiltros}}>
                    <TablaMonitoreoFiltro openModal={openModalMock}/>
                </MonitoreoFiltroContext.Provider>
            </ContextProvider>
        )
        

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockMonitoreoFiltroList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockMonitoreoFiltroValue = {
            monitoreofiltroList: [],
            obtenerMonitoreoFiltro: jest.fn(),
            obtenerMonitoreoFiltros: jest.fn(),
        };

        const { getByText } = render(
            <MonitoreoFiltroContext.Provider value={mockMonitoreoFiltroValue}>
                <TablaMonitoreoFiltro />
            </MonitoreoFiltroContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="monitoreo filtro" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})