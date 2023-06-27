import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaEstadoEquipoInstalacion from 'pages/estadoEquipoInstalacion/components/TablaEstadoEquipoInstalacion';
import { ContextProvider } from 'contexts/ContextProvider';
import EstadoEquipoInstalacionContext from 'pages/estadoEquipoInstalacion/context/EstadoEquipoInstalacionContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Estado Equipo Instalación', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockEstadoEquipoInstalacionList = [
            { id: 1, nombre: "Estado Equipo Instalación 1", activo: true },
            { id: 2, nombre: "Estado Equipo Instalación 2", activo: false },
          ];
        
        const obtenerEstadoEquipoInstalaciones = jest.fn()
        const obtenerEstadoEquipoInstalacion = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <EstadoEquipoInstalacionContext.Provider value={{ EstadoEquipoInstalacionList: mockEstadoEquipoInstalacionList, obtenerEstadoEquipoInstalacion, obtenerEstadoEquipoInstalaciones}}>
                    <TablaEstadoEquipoInstalacion openModal={() => {}}/>
                </EstadoEquipoInstalacionContext.Provider>
            </ContextProvider>
        )
        
        // Verificar que las columnas se muestren correctamente en la tabla
        expect(screen.getByText("Id")).toBeInTheDocument();
        expect(screen.getByText("Nombre")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
        expect(screen.getByText("Acciones")).toBeInTheDocument();
    
    })
a
    //**3. Valores de la columna "Activo" */
    it('Verifica que la columna “Activo” muestre los botones con un “SI” o “NO” según el valor de la propiedad “Activo” de cada fila. ', () => {

        const mockEstadoEquipoInstalacionList = [
            { id: 1, nombre: "Estado Equipo Instalación 1", activo: true },
            { id: 2, nombre: "Estado Equipo Instalación 2", activo: false },
          ];
        
        const obtenerEstadoEquipoInstalaciones = jest.fn()
        const obtenerEstadoEquipoInstalacion = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <EstadoEquipoInstalacionContext.Provider value={{ EstadoEquipoInstalacionList: mockEstadoEquipoInstalacionList, obtenerEstadoEquipoInstalacion, obtenerEstadoEquipoInstalaciones}}>
                    <TablaEstadoEquipoInstalacion openModal={() => {}}/>
                </EstadoEquipoInstalacionContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockEstadoEquipoInstalacionList[0].activo
        const segundoActivoFalse = mockEstadoEquipoInstalacionList[1].activo

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
        const mockEstadoEquipoInstalacionList = [
            { id: 1, nombre: "Version Equipo 1", activo: true },
            { id: 2, nombre: "Version Equipo 2", activo: false },
          ];
        
        const obtenerEstadoEquipoInstalacion = jest.fn().mockResolvedValue();
        const obtenerEstadoEquipoInstalaciones = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <EstadoEquipoInstalacionContext.Provider value={{ EstadoEquipoInstalacionList: mockEstadoEquipoInstalacionList, obtenerEstadoEquipoInstalacion, obtenerEstadoEquipoInstalaciones }}>
                    <TablaEstadoEquipoInstalacion openModal={openModalMock}/>
                </EstadoEquipoInstalacionContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerEstadoEquipoInstalacion).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockEstadoEquipoInstalacionList = [
            { id: 1, nombre: "Estado Equipo Instalacion 1", activo: true },
            { id: 2, nombre: "Estado Equipo Instalacion 2", activo: false },
            { id: 3, nombre: "Estado Equipo Instalacion Equipo 3", activo: true },
          ];
        
        const obtenerEstadoEquipoInstalaciones = jest.fn().mockResolvedValue(mockEstadoEquipoInstalacionList);
        const obtenerEstadoEquipoInstalacion = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <EstadoEquipoInstalacionContext.Provider value={{ EstadoEquipoInstalacionList: mockEstadoEquipoInstalacionList, obtenerEstadoEquipoInstalacion, obtenerEstadoEquipoInstalaciones }}>
                    <TablaEstadoEquipoInstalacion openModal={openModalMock}/>
                </EstadoEquipoInstalacionContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockEstadoEquipoInstalacionList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockEstadoEquipoInstalacionValue = {
            EstadoEquipoInstalacionList: [],
            obtenerEstadoEquipoInstalacion: jest.fn(),
            obtenerEstadoEquipoInstalaciones: jest.fn(),
        };
        const { getByText } = render(
            <EstadoEquipoInstalacionContext.Provider value={mockEstadoEquipoInstalacionValue}>
                <TablaEstadoEquipoInstalacion />
            </EstadoEquipoInstalacionContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="estado equipo instalación" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})