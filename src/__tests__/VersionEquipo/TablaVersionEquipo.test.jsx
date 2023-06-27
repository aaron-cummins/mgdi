import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaVersionEquipo from 'pages/versionEquipo/components/TablaVersionEquipo';
import { ContextProvider } from 'contexts/ContextProvider';
import { VersionEquipoContext } from 'pages/versionEquipo/context/versionEquipoContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Versión Equipo', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockVersionEquipoList = [
            { id: 1, version: "Version Equipo 1", activo: true },
            { id: 2, version: "Version Equipo 2", activo: false },
          ];
        
        const obtenerVersionEquipos = jest.fn()
        const obtenerVersionEquipo = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < VersionEquipoContext.Provider value={{ versionequipoList: mockVersionEquipoList, obtenerVersionEquipo, obtenerVersionEquipos }}>
                    <TablaVersionEquipo openModal={() => {}}/>
                </VersionEquipoContext.Provider>
            </ContextProvider>
        )
        
        // Verificar que las columnas se muestren correctamente en la tabla
        expect(screen.getByText("Id")).toBeInTheDocument();
        expect(screen.getByText("Versión")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
        expect(screen.getByText("Acciones")).toBeInTheDocument();
    
    })

    //**3. Valores de la columna "Activo" */
    it('Verifica que la columna “Activo” muestre los botones con un “SI” o “NO” según el valor de la propiedad “Activo” de cada fila. ', () => {

        const mockVersionEquipoList = [
            { id: 1, version: "Version Equipo 1", activo: true },
            { id: 2, version: "Version Equipo 2", activo: false },
          ];
        
        const obtenerVersionEquipos = jest.fn()
        const obtenerVersionEquipo = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < VersionEquipoContext.Provider value={{ versionequipoList: mockVersionEquipoList, obtenerVersionEquipo, obtenerVersionEquipos }}>
                    <TablaVersionEquipo openModal={() => {}}/>
                </VersionEquipoContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockVersionEquipoList[0].activo
        const segundoActivoFalse = mockVersionEquipoList[1].activo

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
        const mockVersionEquipoList = [
            { id: 1, version: "Version Equipo 1", activo: true },
            { id: 2, version: "Version Equipo 2", activo: false },
          ];
        
        const obtenerVersionEquipo = jest.fn().mockResolvedValue();
        const obtenerVersionEquipos = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < VersionEquipoContext.Provider value={{ versionequipoList: mockVersionEquipoList, obtenerVersionEquipo, obtenerVersionEquipos }}>
                    <TablaVersionEquipo openModal={openModalMock}/>
                </VersionEquipoContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerVersionEquipo).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**4. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockVersionEquipoList = [
            { id: 1, version: "Version Equipo 1", activo: true },
            { id: 2, version: "Version Equipo 2", activo: false },
            { id: 3, version: "Version Equipo 3", activo: true },
          ];
        
        const obtenerVersionEquipos = jest.fn().mockResolvedValue(mockVersionEquipoList);
        const obtenerVersionEquipo = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                < VersionEquipoContext.Provider value={{ versionequipoList: mockVersionEquipoList, obtenerVersionEquipo, obtenerVersionEquipos }}>
                    <TablaVersionEquipo openModal={openModalMock}/>
                </VersionEquipoContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockVersionEquipoList.length +1);
    })


    /** No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockVersionEquipoValue = {
            versionequipoList: [],
            obtenerVersionEquipo: jest.fn(),
            obtenerVersionEquipos: jest.fn(),
        };
        const { getByText } = render(
            <VersionEquipoContext.Provider value={mockVersionEquipoValue}>
                <TablaVersionEquipo />
            </VersionEquipoContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /**Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="version equipo" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})