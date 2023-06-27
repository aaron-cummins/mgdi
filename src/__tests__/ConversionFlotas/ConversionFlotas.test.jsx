import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from 'contexts/ContextProvider';
import { SnackbarProvider} from 'notistack';
import ConversionFlotasContext from 'pages/conversionFlotas/context/ConversionFlotasContext';
import FormConversionFlotas from 'pages/conversionFlotas/components/FormConversionFlotas';
import ConversionFlotas from 'pages/conversionFlotas/ConversionFlotas';

describe('Conversión flotas ', () => {

    //Realiza una limpieza después de cada ejecución de los test    
    afterEach(cleanup);
    afterEach(jest.clearAllMocks)
    
    /**1. Renderización del componente */
    const renderComponent = () =>
        render(
        <ContextProvider>
            <SnackbarProvider maxSnack={2}>
                <ConversionFlotas />
            </SnackbarProvider>
        </ContextProvider>
        );
    
    /**2. Verificación de elementos en el formulario*/
    it('Verificar la existencia del campo Nombre, el campo abreviación, el select flota, el select fuente de información, el select conversión flota, el botón Guardar, el botón Cancelar, la casilla de verificación Activo y el icono de cierre de modal en el formulario', () =>{
        //Renderización del componente 

        const obtenerFlotas = jest.fn()
        const obtenerFuenteInformacion = jest.fn()
        const obtenerConversionLugarTrabajo = jest.fn()

        render(
            <ContextProvider>
                <ConversionFlotasContext value={{ obtenerFlotas, obtenerFuenteInformacion, obtenerConversionLugarTrabajo }}>
                  <SnackbarProvider maxSnack={2}>
                    <ConversionFlotas closeModal={() => {}} />
                  </SnackbarProvider>
                </ConversionFlotasContext>
            </ContextProvider>
          );

        //Encuentra los elementos en el formnulario
        const InputNombre = screen.getByLabelText("Nombre *");
        const InputAbreviacion = screen.getByLabelText("Abreviación");
        const InputFlota = screen.getByLabelText("Flota *");
        const InputFuenteInformacion = screen.getByLabelText("Fuente información");
        const InputConversionLugarTrabajo = screen.getByLabelText("Conversión lugar trabajo *");
        const checkboxElemento = screen.getByTestId("Checkboxtest");

        const SubmitButtonElemento = screen.getByTestId("submittest"); 
        const cancelButtonElemento = screen.getByTestId("canceltest");
        const iconCerrarModalElemento = screen.getByTestId("CloseIcon")

        //Verificar que los elementos existan en el formulario
        expect(InputNombre).toBeInTheDocument(); 
        expect(InputAbreviacion).toBeInTheDocument(); 
        expect(InputFlota).toBeInTheDocument(); 
        expect(InputFuenteInformacion).toBeInTheDocument(); 
        expect(InputConversionLugarTrabajo).toBeInTheDocument(); 
        expect(checkboxElemento).toBeInTheDocument(); 
        expect(SubmitButtonElemento).toBeTruthy(); 
        expect(cancelButtonElemento).toBeTruthy(); 
        expect(iconCerrarModalElemento).toBeTruthy(); 
    })
    
})
