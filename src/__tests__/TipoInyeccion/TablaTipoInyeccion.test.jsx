import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaTipoInyeccion from 'pages/tipoInyeccion/components/TablaTipoInyeccion';
import { ContextProvider } from 'contexts/ContextProvider';
import { TipoInyeccionContext } from 'pages/tipoInyeccion/context/tipoinyeccionContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Tipo Inyección', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockTipoInyeccionList = [
            { id: 1, nombre: "Tipo Inyeccion 1", activo: true },
            { id: 2, nombre: "Tipo Inyeccion 2", activo: false },
          ];
        
        const obtenerTipoInyeccion = jest.fn()
        const obtenerTipoInyecciones = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoInyeccionContext.Provider value={{ tipoinyeccionList: mockTipoInyeccionList, obtenerTipoInyeccion, obtenerTipoInyecciones}}>
                    <TablaTipoInyeccion openModal={() => {}}/>
                </TipoInyeccionContext.Provider>
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

        const mockTipoInyeccionList = [
            { id: 1, nombre: "Tipo Inyeccion 1", activo: true },
            { id: 2, nombre: "Tipo Inyeccion 2", activo: false },
          ];
        
        const obtenerTipoInyeccion = jest.fn()
        const obtenerTipoInyecciones = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoInyeccionContext.Provider value={{ tipoinyeccionList: mockTipoInyeccionList, obtenerTipoInyeccion, obtenerTipoInyecciones}}>
                    <TablaTipoInyeccion openModal={() => {}}/>
                </TipoInyeccionContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockTipoInyeccionList[0].activo
        const segundoActivoFalse = mockTipoInyeccionList[1].activo

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
        const mockTipoInyeccionList = [
            { id: 1, nombre: "Tipo Inyeccion 1", activo: true },
            { id: 2, nombre: "Tipo Inyeccion 2", activo: false },
          ];
        
        const obtenerTipoInyecciones = jest.fn().mockResolvedValue();
        const obtenerTipoInyeccion = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoInyeccionContext.Provider value={{ tipoinyeccionList: mockTipoInyeccionList, obtenerTipoInyeccion, obtenerTipoInyecciones}}>
                    <TablaTipoInyeccion openModal={openModalMock}/>
                </TipoInyeccionContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerTipoInyeccion).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockTipoInyeccionList = [
            { id: 1, nombre: "Tipo Inyeccion 1", activo: true },
            { id: 2, nombre: "Tipo Inyeccion 2", activo: false },
            { id: 3, nombre: "Tipo Inyeccion 3", activo: true },
          ];
        
        const obtenerTipoInyecciones = jest.fn().mockResolvedValue(mockTipoInyeccionList);
        const obtenerTipoInyeccion = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipoInyeccionContext.Provider value={{ tipoinyeccionList: mockTipoInyeccionList, obtenerTipoInyeccion, obtenerTipoInyecciones}}>
                    <TablaTipoInyeccion openModal={openModalMock}/>
                </TipoInyeccionContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockTipoInyeccionList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockTipoInyeccionValue = {
            tipoinyeccionList: [],
            obtenerTipoInyeccion: jest.fn(),
            obtenerTipoInyecciones: jest.fn(),
        };
        const { getByText } = render(
            <TipoInyeccionContext.Provider value={mockTipoInyeccionValue}>
                <TablaTipoInyeccion />
            </TipoInyeccionContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="tipo inyección" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})