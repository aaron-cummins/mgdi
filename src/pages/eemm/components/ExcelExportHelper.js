import { utils, write } from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { RiFileExcel2Fill } from "react-icons/ri";
import { formatDateshort, Month, Year } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import { useStateContext } from "contexts/ContextProvider";

const ExcelExportHelper = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();

  const TransformaDataEemm = (dataList) => {
    let dataEemm = [];
    dataList.forEach((item) => {
      dataEemm.push({
        id: item.esn?.esnPlaca + item.estadoMotor?.nombre.toUpperCase(),
        faena: item.flotaLugarTrabajo?.lugarTrabajo?.nombre,
        tipoContrato: item.contrato?.tipoContrato?.nombre,
        flotaEquipo: item.flotaLugarTrabajo?.flotas?.nombre,
        nroSerie: item.unidad?.nserieEquipo,
        oem: item.unidad?.oem?.nombre,
        unidad: item.unidad?.nombre,
        esn: item.esn.esn,
        placa: item.esn?.esnPlaca,
        arregloMotor: item.esn?.versionMotor?.motor?.nombre + " " + item.esn?.versionMotor?.tipoEmision?.nombre,
        modeloMotor: item.esn?.versionMotor?.motor?.nombre + " " + item.esn?.versionMotor?.tipoInyeccion?.nombre,
        estado: item.estadoMotor?.nombre.toUpperCase(),
        hrEquipoInstalacion: item.hrEquipoInstalacion,
        hrMotorInstalacion: item.hrMotorInstalacion,
        estadoinstalacion: item.estadoMotorInstalacion?.nombre.toUpperCase(),
        fechaPs: formatDateshort(item.fechaps),
        hrOperadasMotor: item.hrOperadasMotor,
        hrAcumuladasMotor: item.hrAcumuladasMotor,
        hrHistoricoMotor: item.hrHistoricoMotor,
        fechaFalla: item.fechaFalla ? formatDateshort(item.fechaFalla) : "",
        anoSalida: item.fechaFalla ? Year(item.fechaFalla) : "",
        mesSalida: item.fechaFalla ? Month(item.fechaFalla) : "",
        tipoSalida2: "",
        categoriaDetencion: "",
        motivoCambio: item.motivoCambio?.nombre,
        tipoSalida: item.tipoSalida?.nombre,
        correlativoDbm: item.intervencionId,
      });
    });

    return dataEemm;
  };

  const TransformaDataModelo = (dataList) => {
    let dataModelo = [];
    dataList.forEach((item) => {
      if (item.estadoMotor?.nombre.toUpperCase() === "OPERANDO") {
        dataModelo.push({
          ID1: item.flotaLugarTrabajo?.lugarTrabajo?.nombre + item.unidad?.nombre,
          ID2: item.unidad?.nombre + item.esn?.esn,
          ESTADO_EQUIPO: item.estadoEquipo?.nombre,
          FAENA: item.flotaLugarTrabajo?.lugarTrabajo?.nombre,
          APLICACION: item.unidad?.aplicacionOem?.nombre,
          FLOTA_EQUIPO: item.flotaLugarTrabajo?.flotas?.nombre,
          UNIDAD: item.unidad?.nombre,
          ESN: item.esn?.esn,
          ESTADO_MOTOR: item.estadoMotor?.nombre.toUpperCase(),
          PS: formatDateshort(item.fechaps),
          HOROMETRO_PS: item.hrMotorInstalacion,
          HOROMETRO_OPERADO: 0,
          HOROMETRO_ACUMULADO_ENTRGADO: 0,
          FECHA_ACTUALIZACION_HOROMETRO: "",
          AVANCE_TEORICO: 0,
          OEM: item.unidad?.oem?.nombre,
          MODELO_EQUIPO: item.unidad?.modelo,
          NSERIE: item.unidad?.nserieEquipo,
          MOTOR: item.esn?.versionMotor?.motor?.nombre,
          MODELO_MOTOR: item.esn?.versionMotor?.motor?.nombre + " " + item.esn?.versionMotor?.tipoInyeccion?.nombre,
          TIPO_EMISION: item.esn?.versionMotor?.tipoEmision?.nombre,
          TIPO_INYECCION: item.esn?.versionMotor?.tipoInyeccion?.nombre,
          ARREGLO_MOTOR: item.esn?.versionMotor?.motor?.nombre + " " + item.esn?.versionMotor?.tipoEmision?.nombre,
          MODELO_MOTOR2:
            item.esn?.versionMotor?.motor?.nombre +
            " " +
            item.esn?.versionMotor?.tipoInyeccion?.nombre +
            " " +
            item.esn?.versionMotor?.tipoEmision?.nombre,
          ABREVIACION: item.flotaLugarTrabajo?.lugarTrabajo?.abreviacion,
          TIPO_CONTRATO: item.contrato?.tipoContrato?.nombre,
          ZONA: item.flotaLugarTrabajo?.lugarTrabajo?.zona?.nombre,
          ALTURA_MINA: item.flotaLugarTrabajo?.lugarTrabajo?.altura,
          LATITUD: item.flotaLugarTrabajo?.lugarTrabajo?.latitud,
          LONGITUD: item.flotaLugarTrabajo?.lugarTrabajo?.longitud,
          DBM: "Aplica",
        });
      }
    });
    return dataModelo;
  };

  const createDownLoadData = () => {
    if (!data || data.length <= 0) {
      enqueueSnackbar("No existe data para descargar", { variant: "error" });
      return false;
    }

    handleExport().then((url) => {
      //console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "Estado_motores_nacional.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    //console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    //console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      //console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const wb = utils.book_new();
    const wsEemm = utils.json_to_sheet([]);
    const wsModelo = utils.json_to_sheet([]);
    //const ws = utils.json_to_sheet(TransformaDataEemm(eemmList));
    const headersEemm = [
      [
        "ID",
        "FAENA",
        "TIPO CONTRATO",
        "FLOTA/EQUIPO",
        "N SERIE",
        "OEM",
        "UNIDAD",
        "ESN",
        "PLACA",
        "ARREGLO MOTOR",
        "MODELO MOTOR",
        "ESTADO",
        "HR EQUIPO EN LA INSTALACION",
        "HR MOTOR EN LA INSTALACION",
        "ESTADO EN LA INSTALACION",
        "FECHA PS",
        "HR OPERADAS MOTOR",
        "HR ACUMULADAS MOTOR",
        "HR HISTORICO MOTOR",
        "FECHA FALLA",
        "AÑO SALIDA",
        "MES SALIDA",
        "TIPO SALIDA 2",
        "CATEGORIA DETENCION",
        "MOTIVO CAMBIO",
        "TIPO SALIDA",
        "CORRELTIVO INTERVENCION",
      ],
    ];

    const headersModelo = [
      [
        "ID1",
        "ID2",
        "ESTADO EQUIPO",
        "FAENA",
        "APLICACION",
        "FLOTA/EQUIPO",
        "UNIDAD",
        "ESN",
        "ESTADO MOTOR",
        "PS",
        "HOROMETRO PS",
        "HOROMETRO OPERADO",
        "HOROMETRO ACUMULADO ENTRGADO",
        "FECHA ACTUALIZACION HOROMETRO",
        "AVANCE TEORICO",
        "OEM",
        "MODELO EQUIPO",
        "N SERIE",
        "MOTOR",
        "MODELO MOTOR",
        "TIPO EMISION",
        "TIPO INYECCION",
        "ARREGLO MOTOR",
        "MODELO MOTOR 2",
        "ABREVIACION",
        "TIPO CONTRATO",
        "ZONA",
        "ALTURA MINA (METROS)",
        "LATITUD",
        "LONGITUD",
        "DBM",
      ],
    ];

    utils.sheet_add_aoa(wsEemm, headersEemm, { color: "000000" });
    utils.sheet_add_json(wsEemm, TransformaDataEemm(data), { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, wsEemm, "Estado de Motores");

    utils.sheet_add_aoa(wsModelo, headersModelo, { color: "000000" });
    utils.sheet_add_json(wsModelo, TransformaDataModelo(data), { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, wsModelo, "Modelo");

    const workbookBlob = workbook2blob(wb);

    return addStyle(workbookBlob);
  };

  const addStyle = (workbookBlob) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      console.log(workbook.sheets(1));

      workbook.sheets().forEach((sheet) => {
        //Formato de toda la hoja
        sheet.usedRange().style({
          fontFamily: "calibri",
          horizontalAlignment: "right",
          fontSize: 8,
        });
      });

      let sheet = workbook.sheets();

      //Formato de titulo
      sheet[0].range("A1:AA1").style({
        bold: true,
        fontColor: "ffffff",
        fill: "D02323",
        verticalAlignment: "center",
        horizontalAlignment: "center",
        wrapText: true,
      });
      //formato de celdas con estado operando
      sheet[0]._sheetDataNode.children.forEach((item) => {
        if (item._cells[12].value() === "OPERANDO") {
          item._cells.forEach((col) => {
            if (col.value() === "OPERANDO") {
              col.style({ fill: "92D050" });
            } else
              col.style({
                fill: "BFBFBF",
              });
          });
        }
      });

      sheet[0].row(1).height(30);
      sheet[0].column("A").width(15);
      sheet[0].column("B").width(20);
      sheet[0].column("M").width(20);
      sheet[0].column("N").width(20);
      sheet[0].column("O").width(20);

      //Formato de titulo
      sheet[1].range("A1:AE1").style({
        bold: true,
        fontColor: "ffffff",
        fill: "D02323",
        verticalAlignment: "center",
        horizontalAlignment: "center",
        wrapText: true,
      });

      /*workbook.sheets().forEach((sheet) => {
        //Formato de toda la hoja
        sheet.usedRange().style({
          fontFamily: "calibri",
          horizontalAlignment: "right",
          fontSize: 8,
        });

        //Formato de titulo
        sheet.range("A1:AA1").style({
          bold: true,
          fontColor: "ffffff",
          fill: "D02323",
          verticalAlignment: "center",
          horizontalAlignment: "center",
          wrapText: true,
        });

        //formato de celdas con estado operando
        sheet._sheetDataNode.children.forEach((item) => {
          if (item._cells[12].value() === "OPERANDO") {
            item._cells.forEach((col) => {
              if (col.value() === "OPERANDO") {
                col.style({ fill: "92D050" });
              } else
                col.style({
                  fill: "BFBFBF",
                });
            });
          }
        });

        sheet.row(1).height(30);
        sheet.column("A").width(15);
        sheet.column("B").width(20);

        sheet.column("M").width(20);
        sheet.column("N").width(20);

        sheet.column("O").width(20);
      });*/

      return workbook.outputAsync().then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <button
        type="button"
        style={{
          color: "white",
          borderRadius: "10px",
        }}
        className={`gap-2 p-2 mb-2 hover:drop-shadow-xl bg-green-dark-cummins hover:bg-green-dark-cummins text-center inline-flex items-center`}
        onClick={createDownLoadData}>
        <RiFileExcel2Fill />
        <span>Exportar</span>
      </button>
    </>
  );
};

export default ExcelExportHelper;
