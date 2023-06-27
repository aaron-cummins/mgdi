import DataTable from "react-data-table-component";
import Checkbox from "@mui/material/Checkbox";
import { ArrowDownward } from "@mui/icons-material";
import { Spinner } from "components";
//import useFetchAndLoad from "hooks/useFetchAndLoad";
//import { useStateContext } from "contexts/ContextProvider";
//import { useEffect } from "react";

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const Tabla = (props) => {
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "16px", // override the cell padding for head cells
        paddingRight: "16px",
        background: "#e9ecef", //"#fafafa",
        fontSize: "20x",
        fontWeight: 900,
      },
    },
    cells: {
      style: {
        paddingLeft: "16px", // override the cell padding for data cells
        paddingRight: "16px",
      },
    },
  };

  const paginationOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    noRowsPerPage: false,
    selectAllRowsItem: false,
    selectAllRowsItemText: "Todos",
  };

  return (
    <>
      <div className="border-solid border-1">
        <DataTable
          //progressPending={cargando}
          data-testid="Tablatest"
          progressComponent={<Spinner />}
          customStyles={customStyles}
          pagination={!props.pagination ? true : props.pagination}
          paginationComponentOptions={paginationOptions}
          noDataComponent="No se encontraron datos para mostrar"
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={selectProps}
          paginationRowsPerPageOptions={[10, 25, 30, 50]}
          sortIcon={sortIcon}
          dense
          {...props}
        />
      </div>
    </>
  );
};

export default Tabla;
