import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TablaRoles from 'pages/roles/components/TablaRoles';
import { ContextProvider } from 'contexts/ContextProvider';
import { RolesContext } from 'pages/roles/context/rolesContext';
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

describe('Roles', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)

    //**2. Renderización de las columnas "Id", "Nombre", "Activo" y "Acciones" */
    it('Verificar que las columnas "Id", "Nombre", "Activo" y "Acciones" se rendericen correctamente', () => {

        const mockRolesList = [
            { id: 1, nombre: "Rol 1", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
            { id: 1, nombre: "Rol 2", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
          ];
        
        const obtenerRoles = jest.fn()
        const obtenerRoleslist = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <RolesContext.Provider value={{ rolesList: mockRolesList, obtenerRoles, obtenerRoleslist}}>
                    <TablaRoles openModal={() => {}}/>
                </RolesContext.Provider>
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

        const mockRolesList = [
            { id: 1, nombre: "Rol 1", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
            { id: 1, nombre: "Rol 2", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
          ];
        
        const obtenerRoles = jest.fn()
        const obtenerRoleslist = jest.fn()
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <RolesContext.Provider value={{ rolesList: mockRolesList, obtenerRoles, obtenerRoleslist}}>
                    <TablaRoles openModal={() => {}}/>
                </RolesContext.Provider>
            </ContextProvider>
        )

        //Obtiene el valor de la columna "Activo" del mock
        const primerActivoTrue = mockRolesList[0].activo
        const segundoActivoFalse = mockRolesList[1].activo

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
        const mockRolesList = [
            { id: 1, nombre: "Rol 1", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
            { id: 1, nombre: "Rol 2", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
          ];
        
        const obtenerRoles = jest.fn().mockResolvedValue();
        const obtenerRoleslist = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <RolesContext.Provider value={{ rolesList: mockRolesList, obtenerRoles, obtenerRoleslist}}>
                    <TablaRoles openModal={openModalMock}/>
                </RolesContext.Provider>
            </ContextProvider>
        )
        
        //Simula un click en el botón editar
        const buttonEditar = screen.getAllByTestId("EditartestID");
        fireEvent.click(buttonEditar[0]);

        //Esperando que el modal se abra con exito llamando a la función ModalMock
        expect(obtenerRoles).toHaveBeenCalled();
        expect(openModalMock).toHaveBeenCalledTimes(1);
    })

    //**5. Renderización del formulario" */
    it('Verificar que los datos obtenidos de la API se muestran correctamente en la tabla', async () => {
        const mockRolesList = [
            { id: 1, nombre: "Rol 1", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
            { id: 1, nombre: "Rol 2", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
            { id: 1, nombre: "Rol 3", activo: true, permisosGlobales: [], created_at: expect.any(String), updated_at: expect.any(String) },
          ];
        
        const obtenerRoleslist= jest.fn().mockResolvedValue(mockRolesList);
        const obtenerRoles = jest.fn().mockResolvedValue();
        const openModalMock = jest.fn();
        
        //Renderización de la tabla
        render(
            <ContextProvider>
                <RolesContext.Provider value={{ rolesList: mockRolesList, obtenerRoles, obtenerRoleslist}}>
                    <TablaRoles openModal={openModalMock}/>
                </RolesContext.Provider>
            </ContextProvider>
        )

        const tablaElement = await screen.findByRole("table");
        expect(tablaElement).toBeInTheDocument();

        const rows = await screen.findAllByRole("row");
        expect(rows.length).toBe(mockRolesList.length +1);
    })


    /** 6. No retorno de datos en la API */
    it("Verificar que se muestre el mensaje 'No se encontraron datos para mostrar' cuando no se devuelvan datos en la API: ", async () => {
        const mockRolesValue = {
            rolesList: [],
            obtenerRoles: jest.fn(),
            obtenerRoleslist: jest.fn(),
        };

        const { getByText } = render(
            <RolesContext.Provider value={mockRolesValue}>
                <TablaRoles />
            </RolesContext.Provider>
        );

        await waitFor(() => expect(getByText("No se encontraron datos para mostrar")).toBeInTheDocument());
    });


    /** 7.Renderizacion de componente OpcionesTabla */
    it('Verificar que el componente OpcionesTabla se renderice correctamente', () => {
        render(<OpcionesTabla editar={true} nombreform="roles" />);

        expect(screen.getByTestId('EditartestID')).toBeInTheDocument();
        expect(screen.getByTestId('EditartestID')).toHaveClass('bg-blue-light-cummins');
    });

})