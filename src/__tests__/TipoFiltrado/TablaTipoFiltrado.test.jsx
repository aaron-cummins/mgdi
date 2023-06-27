import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaTipoFiltrado from 'pages/tipoFiltrado/components/TablaTipoFiltrado';
import { ContextProvider } from 'contexts/ContextProvider';
import { TipoFiltradoContext } from 'pages/tipoFiltrado/context/tipofiltradoContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Tipo Filtrado', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockTipoFiltradoList = [
            { id: 1, nombre: "Tipo Emision 1", activo: true },
            { id: 2, nombre: "Tipo Emision 2", activo: false },
          ];
        
        const obtenerTipoFiltrado = jest.fn()
        const obtenerTipoFiltrados = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoFiltradoContext.Provider value={{ tipofiltradoList: mockTipoFiltradoList, obtenerTipoFiltrado, obtenerTipoFiltrados}}>
                    <TablaTipoFiltrado openModal={() => {}}/>
                </TipoFiltradoContext.Provider>
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

        const mockTipoFiltradoList = [
            { id: 1, nombre: "Tipo Emision 1", activo: true },
            { id: 2, nombre: "Tipo Emision 2", activo: false },
          ];
        
        const obtenerTipoFiltrado = jest.fn()
        const obtenerTipoFiltrados = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoFiltradoContext.Provider value={{ tipofiltradoList: mockTipoFiltradoList, obtenerTipoFiltrado, obtenerTipoFiltrados}}>
                    <TablaTipoFiltrado openModal={() => {}}/>
                </TipoFiltradoContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockTipoFiltradoList[0].activo
        const segundoActivoFalse = mockTipoFiltradoList[1].activo

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
        const mockTipoFiltradoList = [
            { id: 1, nombre: "Tipo Filtrado 1", activo: true },
            { id: 2, nombre: "Tipo Filtrado 2", activo: false },
          ];
        
        const obtenerTipoFiltrados = jest.fn().mockResolvedValue();
        const obtenerTipoFiltrado = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoFiltradoContext.Provider value={{ tipofiltradoList: mockTipoFiltradoList, obtenerTipoFiltrado, obtenerTipoFiltrados}}>
                    <TablaTipoFiltrado openModal={openModalMock}/>
                </TipoFiltradoContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerTipoFiltrado).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockTipoFiltradoList = [
            { id: 1, nombre: "Tipo Filtrado 1", activo: true },
            { id: 2, nombre: "Tipo Filtrado 2", activo: false },
            { id: 3, nombre: "Tipo Filtrado 3", activo: true },
          ];
        
        const obtenerTipoFiltrados = jest.fn().mockResolvedValue(mockTipoFiltradoList);
        const obtenerTipoFiltrado = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoFiltradoContext.Provider value={{ tipofiltradoList: mockTipoFiltradoList, obtenerTipoFiltrado, obtenerTipoFiltrados}}>
                    <TablaTipoFiltrado openModal={openModalMock}/>
                </TipoFiltradoContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockTipoFiltradoList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockTipoFiltradoValue = {
            tipofiltradoList: [],
            obtenerTipoFiltrado: jest.fn(),
            obtenerTipoFiltrados: jest.fn(),
        };
        const { getByText } = render(
            <TipoFiltradoContext.Provider value={mockTipoFiltradoValue}>
                <TablaTipoFiltrado />
            </TipoFiltradoContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="tipo filtrado" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})