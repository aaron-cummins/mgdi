import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaMonitoreoMotor from 'pages/monitoreoMotor/components/TablaMonitoreoMotor';
import { ContextProvider } from 'contexts/ContextProvider';
import { MonitoreoMotorContext } from 'pages/monitoreoMotor/context/monitoreoMotorContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Monitoreo Motor', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockMonitoreoMotorList = [
            { id: 1, nombre: "Monitoreo Motor 1", activo: true },
            { id: 2, nombre: "Monitoreo Motor 2", activo: false },
          ];
        
        const obtenerMonitoreoMotor = jest.fn()
        const obtenerMonitoreoMotors = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <MonitoreoMotorContext.Provider value={{ monitoreomotorList: mockMonitoreoMotorList, obtenerMonitoreoMotor, obtenerMonitoreoMotors}}>
                    <TablaMonitoreoMotor openModal={() => {}}/>
                </MonitoreoMotorContext.Provider>
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

        const mockMonitoreoMotorList = [
            { id: 1, nombre: "Monitoreo Motor 1", activo: true },
            { id: 2, nombre: "Monitoreo Motor 2", activo: false },
          ];
        
        const obtenerMonitoreoMotor = jest.fn()
        const obtenerMonitoreoMotors = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <MonitoreoMotorContext.Provider value={{ monitoreomotorList: mockMonitoreoMotorList, obtenerMonitoreoMotor, obtenerMonitoreoMotors}}>
                    <TablaMonitoreoMotor openModal={() => {}}/>
                </MonitoreoMotorContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockMonitoreoMotorList[0].activo
        const segundoActivoFalse = mockMonitoreoMotorList[1].activo

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
        const mockMonitoreoMotorList = [
            { id: 1, nombre: "Monitoreo Motor 1", activo: true },
            { id: 2, nombre: "Monitoreo Motor 2", activo: false },
          ];
        
        const obtenerMonitoreoMotors = jest.fn().mockResolvedValue();
        const obtenerMonitoreoMotor = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <MonitoreoMotorContext.Provider value={{ monitoreomotorList: mockMonitoreoMotorList, obtenerMonitoreoMotor, obtenerMonitoreoMotors}}>
                    <TablaMonitoreoMotor openModal={openModalMock}/>
                </MonitoreoMotorContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerMonitoreoMotor).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockMonitoreoMotorList = [
            { id: 1, nombre: "Monitoreo Motor 1", activo: true },
            { id: 2, nombre: "Monitoreo Motor 2", activo: false },
            { id: 3, nombre: "Monitoreo Motor 3", activo: true },
          ];
        
        const obtenerMonitoreoMotors = jest.fn().mockResolvedValue(mockMonitoreoMotorList);
        const obtenerMonitoreoMotor = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <MonitoreoMotorContext.Provider value={{ monitoreomotorList: mockMonitoreoMotorList, obtenerMonitoreoMotor, obtenerMonitoreoMotors}}>
                    <TablaMonitoreoMotor openModal={openModalMock}/>
                </MonitoreoMotorContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockMonitoreoMotorList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockMonitoreoMotorValue = {
            monitoreomotorList: [],
            obtenerMonitoreoMotor: jest.fn(),
            obtenerMonitoreoMotors: jest.fn(),
        };
        const { getByText } = render(
            <MonitoreoMotorContext.Provider value={mockMonitoreoMotorValue}>
                <TablaMonitoreoMotor />
            </MonitoreoMotorContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="monitoreo motor" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})