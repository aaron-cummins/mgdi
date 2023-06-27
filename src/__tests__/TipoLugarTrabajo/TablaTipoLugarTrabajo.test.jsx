import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaTipolugarTrabajo from 'pages/tipoLugarTrabajo/components/TablaTipoLugartrabajo';
import { ContextProvider } from 'contexts/ContextProvider';
import { TipolugartrabajoContext } from 'pages/tipoLugarTrabajo/context/tipolugartrabajoContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Tipo Lugar Trabajo', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockTipoLugarTrabajoList = [
            { id: 1, tipo: "Tipo Lugar Trabajo 1", activo: true },
            { id: 2, tipo: "Tipo Lugar Trabajo 2", activo: false },
          ];
        
        const obtenerTipolugartrabajoList = jest.fn()
        const obtenerTipolugartrabajo = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipolugartrabajoContext.Provider value={{ tipolugartrabajoList: mockTipoLugarTrabajoList, obtenerTipolugartrabajo, obtenerTipolugartrabajoList}}>
                    <TablaTipolugarTrabajo openModal={() => {}}/>
                </TipolugartrabajoContext.Provider>
            </ContextProvider>
        )
        
        // Verificar que las columnas se muestren correctamente en la tabla
        expect(screen.getByText("Id")).toBeInTheDocument();
        expect(screen.getByText("Tipo")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
        expect(screen.getByText("Acciones")).toBeInTheDocument();
    
    })

    
    //**3. Valores de la columna "Activo" */
    it('Verifica que la columna “Activo” muestre los botones con un “SI” o “NO” según el valor de la propiedad “Activo” de cada fila. ', () => {

        const mockTipoLugarTrabajoList = [
            { id: 1, tipo: "Tipo Lugar Trabajo 1", activo: true },
            { id: 2, tipo: "Tipo Lugar Trabajo 2", activo: false },
          ];
        
        const obtenerTipolugartrabajoList = jest.fn()
        const obtenerTipolugartrabajo = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipolugartrabajoContext.Provider value={{ tipolugartrabajoList: mockTipoLugarTrabajoList, obtenerTipolugartrabajo, obtenerTipolugartrabajoList}}>
                    <TablaTipolugarTrabajo openModal={() => {}}/>
                </TipolugartrabajoContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockTipoLugarTrabajoList[0].activo
        const segundoActivoFalse = mockTipoLugarTrabajoList[1].activo

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
        const mockTipoLugarTrabajoList = [
            { id: 1, tipo: "Tipo Lugar Trabajo 1", activo: true },
            { id: 2, tipo: "Tipo Lugar Trabajo 2", activo: false },
          ];
        
        const obtenerTipolugartrabajoList = jest.fn().mockResolvedValue();
        const obtenerTipolugartrabajo = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipolugartrabajoContext.Provider value={{ tipolugartrabajoList: mockTipoLugarTrabajoList, obtenerTipolugartrabajo, obtenerTipolugartrabajoList}}>
                    <TablaTipolugarTrabajo openModal={openModalMock}/>
                </TipolugartrabajoContext.Provider>
            </ContextProvider>
        )

        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerTipolugartrabajo).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

     //**5. Renderización del formulario" */
     it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockTipoLugarTrabajoList = [
            { id: 1, tipo: "Tipo Lugar Trabajo1", activo: true },
            { id: 2, tipo: "Tipo Lugar Trabajo 2", activo: false },
            { id: 3, tipo: "Tipo Lugar Trabajo 3", activo: true },
          ];
        
        const obtenerTipolugartrabajoList= jest.fn().mockResolvedValue(mockTipoLugarTrabajoList);
        const obtenerTipolugartrabajo= jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <TipolugartrabajoContext.Provider value={{ tipolugartrabajoList: mockTipoLugarTrabajoList, obtenerTipolugartrabajo, obtenerTipolugartrabajoList}}>
                    <TablaTipolugarTrabajo openModal={openModalMock}/>
                </TipolugartrabajoContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockTipoLugarTrabajoList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockTipolugarTrabajoValue = {
            tipolugartrabajoList: [],
            obtenerTipolugartrabajo: jest.fn(),
            obtenerTipolugartrabajoList: jest.fn(),
        };

        const { getByText } = render(
            <TipolugartrabajoContext.Provider value={mockTipolugarTrabajoValue}>
                <TablaTipolugarTrabajo />
            </TipolugartrabajoContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="tipo lugar trabajo" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})