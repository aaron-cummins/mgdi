import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaTipoBlock from 'pages/tipoBlock/components/TablaTipoBlock';
import { ContextProvider } from 'contexts/ContextProvider';
import { TipoBlockContext } from 'pages/tipoBlock/context/TipoBlockContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Tipo Block', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo", "Experimental" y "Acciones" se rendericen correctamente', () => {

        const mockTipoBlockList = [
            { id: 1, nombre: "Tipo block 1", experimental: "experimental 1", activo: true },
            { id: 2, nombre: "Tipo block 2", experimental: "experimental 2", activo: false },
          ];
        
        const obtenerTipoBlock = jest.fn()
        const obtenerTipoBlocks = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoBlockContext.Provider value={{ TipoBlockList: mockTipoBlockList, obtenerTipoBlock, obtenerTipoBlocks}}>
                    <TablaTipoBlock openModal={() => {}}/>
                </TipoBlockContext.Provider>
            </ContextProvider>
        )
        
        // Verificar que las columnas se muestren correctamente en la tabla
        expect(screen.getByText("Id")).toBeInTheDocument();
        expect(screen.getByText("Nombre")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
        expect(screen.getByText("Experimental")).toBeInTheDocument();
        expect(screen.getByText("Acciones")).toBeInTheDocument();
    
    })

    
    /**3. Valores de la columna "Activo" */
    it('Verifica que la columna “Activo” muestre los botones con un “SI” o “NO” según el valor de la propiedad “Activo” de cada fila. ', () => {

        const mockTipoBlockList = [
            { id: 1, nombre: "Tipo block 1", experimental: true, activo: true },
            { id: 2, nombre: "Tipo block 2", experimental: false, activo: false },
          ];
        
        const obtenerTipoBlock = jest.fn()
        const obtenerTipoBlocks = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoBlockContext.Provider value={{ TipoBlockList: mockTipoBlockList, obtenerTipoBlock, obtenerTipoBlocks}}>
                    <TablaTipoBlock openModal={() => {}}/>
                </TipoBlockContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockTipoBlockList[0].activo
        const segundoActivoFalse = mockTipoBlockList[1].activo

        //Obtiene el valor "SI" y "NO"
        const primerActivoButton = screen.queryAllByText("SI");
        const segundoActivoButton = screen.queryAllByText("NO")

        //Verifica que el valor true muestre el valor SI en la columna Activo
        if (primerActivoTrue) {
            expect(primerActivoButton.length).toBeGreaterThan(0)
        }

        //Verifica que el valor false muestre el valor No en la columna Activo
        if (!segundoActivoFalse) {
            expect(segundoActivoButton.length).toBeGreaterThan(0)
        }
    })

   /**4. Renderización del formulario" */
    it('Verificar que al hacer clic en el icono editar se muestre el formulario', () =>{
        const mockTipoBlockList = [
            { id: 1, nombre: "Tipo block 1", experimental: "experimental 1", activo: true },
            { id: 2, nombre: "Tipo block 2", experimental: "experimental 2", activo: false },
          ];
        
        const obtenerTipoBlocks = jest.fn().mockResolvedValue();
        const obtenerTipoBlock = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoBlockContext.Provider value={{ TipoBlockList: mockTipoBlockList, obtenerTipoBlock, obtenerTipoBlocks}}>
                    <TablaTipoBlock openModal={openModalMock}/>
                </TipoBlockContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerTipoBlock).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockTipoBlockList = [
            { id: 1, nombre: "Tipo block 1", experimental: "experimental 1", activo: true },
            { id: 2, nombre: "Tipo block 2", experimental: "experimental 2", activo: false },
            { id: 2, nombre: "Tipo block 3", experimental: "experimental 3", activo: false },
          ];
        
        const obtenerTipoBlocks = jest.fn().mockResolvedValue(mockTipoBlockList);
        const obtenerTipoBlock = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoBlockContext.Provider value={{ TipoBlockList: mockTipoBlockList, obtenerTipoBlock, obtenerTipoBlocks}}>
                    <TablaTipoBlock openModal={openModalMock}/>
                </TipoBlockContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockTipoBlockList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockTipoBlockValue = {
            TipoBlockList: [],
            obtenerTipoBlock: jest.fn(),
            obtenerTipoBlocks: jest.fn(),
        };
        const { getByText } = render(
            <TipoBlockContext.Provider value={mockTipoBlockValue}>
                <TablaTipoBlock />
            </TipoBlockContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="tipo block" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})