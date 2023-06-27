import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaAplicacion from 'pages/aplicacion/components/TablaAplicacion';
import { ContextProvider } from 'contexts/ContextProvider';
import { AplicacionContext } from 'pages/aplicacion/context/aplicacionContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Aplicación', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockAplicacionList = [
            { id: 1, nombre: "Aplicacion 1", activo: true },
            { id: 2, nombre: "Aplicacion 2", activo: false },
          ];
        
        const obtenerAplicacion = jest.fn()
        const obtenerAplicaciones = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <AplicacionContext.Provider value={{ aplicacionList: mockAplicacionList, obtenerAplicacion, obtenerAplicaciones}}>
                    <TablaAplicacion openModal={() => {}}/>
                </AplicacionContext.Provider>
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

        const mockAplicacionList = [
            { id: 1, nombre: "Aplicacion 1", activo: true },
            { id: 2, nombre: "Aplicacion 2", activo: false },
          ];
        
        const obtenerAplicacion = jest.fn()
        const obtenerAplicaciones = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <AplicacionContext.Provider value={{ aplicacionList: mockAplicacionList, obtenerAplicacion, obtenerAplicaciones}}>
                    <TablaAplicacion openModal={() => {}}/>
                </AplicacionContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockAplicacionList[0].activo
        const segundoActivoFalse = mockAplicacionList[1].activo

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
        const mockAplicacionList = [
            { id: 1, nombre: "Aplicacion 1", activo: true },
            { id: 2, nombre: "Aplicacion 2", activo: false },
          ];
        
        const obtenerAplicaciones = jest.fn().mockResolvedValue();
        const obtenerAplicacion = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <AplicacionContext.Provider value={{ aplicacionList: mockAplicacionList, obtenerAplicacion, obtenerAplicaciones}}>
                    <TablaAplicacion openModal={openModalMock}/>
                </AplicacionContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerAplicacion).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockAplicacionList = [
            { id: 1, nombre: "Aplicacion 1", activo: true },
            { id: 2, nombre: "Aplicacion 2", activo: false },
            { id: 3, nombre: "Aplicacion 3", activo: true },
          ];
        
        const obtenerAplicaciones = jest.fn().mockResolvedValue(mockAplicacionList);
        const obtenerAplicacion = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <AplicacionContext.Provider value={{ aplicacionList: mockAplicacionList, obtenerAplicacion, obtenerAplicaciones}}>
                    <TablaAplicacion openModal={openModalMock}/>
                </AplicacionContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockAplicacionList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockAplicacionValue = {
            aplicacionList: [],
            obtenerAplicacion: jest.fn(),
            obtenerAplicaciones: jest.fn(),
        };
        const { getByText } = render(
            <AplicacionContext.Provider value={mockAplicacionValue}>
                <TablaAplicacion />
            </AplicacionContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="estado motor aplicación" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})