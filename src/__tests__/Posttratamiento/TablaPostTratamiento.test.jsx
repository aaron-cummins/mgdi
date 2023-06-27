import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaPostTratamiento from 'pages/postTratamiento/components/TablaPostTratamiento';
import { ContextProvider } from 'contexts/ContextProvider';
import {PostTratamientoContext} from 'pages/postTratamiento/context/PostTratamientoContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Tabla PostTratamiento', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockPostTratamientoList = [
            { id: 1, nombre: "PostTratamiento 1", activo: true },
            { id: 2, nombre: "PostTratamiento 2", activo: false },
          ];
        
        const obtenerPostTratamientos = jest.fn()
        const obtenerPostTratamiento = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < PostTratamientoContext.Provider value={{ PostTratamientoList: mockPostTratamientoList, obtenerPostTratamiento, obtenerPostTratamientos }}>
                    <TablaPostTratamiento openModal={() => {}}/>
                </PostTratamientoContext.Provider>
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

        const mockPostTratamientoList = [
            { id: 1, nombre: "PostTratamiento 1", activo: true },
            { id: 2, nombre: "PostTratamiento 2", activo: false },
          ];
        
        const obtenerPostTratamientos = jest.fn()
        const obtenerPostTratamiento = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < PostTratamientoContext.Provider value={{ PostTratamientoList: mockPostTratamientoList, obtenerPostTratamiento, obtenerPostTratamientos }}>
                    <TablaPostTratamiento openModal={() => {}}/>
                </PostTratamientoContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockPostTratamientoList[0].activo
        const segundoActivoFalse = mockPostTratamientoList[1].activo

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
        const mockPostTratamientoList = [
            { id: 1, nombre: "PostTratamiento 1", activo: true },
            { id: 2, nombre: "PostTratamiento 2", activo: false },
          ];
        
        const obtenerPostTratamientos = jest.fn().mockResolvedValue();
        const obtenerPostTratamiento = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < PostTratamientoContext.Provider value={{ PostTratamientoList: mockPostTratamientoList, obtenerPostTratamiento, obtenerPostTratamientos }}>
                    <TablaPostTratamiento openModal={openModalMock}/>
                </PostTratamientoContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditarPostTratamiento = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditarPostTratamiento[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerPostTratamiento).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**4. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockPostTratamientoList = [
            { id: 1, nombre: "PostTratamiento 1", activo: true },
            { id: 2, nombre: "PostTratamiento 2", activo: false },
            { id: 3, nombre: "PostTratamiento 3", activo: true },
          ];
        
        const obtenerPostTratamientos = jest.fn().mockResolvedValue(mockPostTratamientoList);
        const obtenerPostTratamiento = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < PostTratamientoContext.Provider value={{ PostTratamientoList: mockPostTratamientoList, obtenerPostTratamiento, obtenerPostTratamientos }}>
                    <TablaPostTratamiento openModal={openModalMock}/>
                </PostTratamientoContext.Provider>
            </ContextProvider>
        )

        screen.debug()
        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockPostTratamientoList.length +1);
    })


    /** No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockContextValue = {
            PostTratamientoList: [],
            obtenerPostTratamiento: jest.fn(),
            obtenerPostTratamientos: jest.fn(),
        };
        const { getByText } = render(
            <PostTratamientoContext.Provider value={mockContextValue}>
                <TablaPostTratamiento />
            </PostTratamientoContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /**Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="posttratamiento" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})