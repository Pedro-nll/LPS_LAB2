import { Dispatch, SetStateAction, useEffect, useMemo } from "react";


import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";
interface IDisciplinesCurriculumProps {
  openModal: boolean;
  disciplines: [];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<boolean>>;
  registrationID: number;
}

export const DisciplinesCurriculumModel = (props: IDisciplinesCurriculumProps) => {
  const [subjectData, setData] = React.useState<any[]>([]);

  useEffect(() => {
    setData(props.disciplines);
  }, [props.openModal]);



  const handleClose = () => {
    props.setOpenModal(false);
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        grow: true,
      },
      {
        accessorKey: "name",
        header: "Disciplina",
      },
      {
        accessorKey: "price",
        header: "Valor",
        Cell: ({ renderedCellValue }) => {
          return `R$ ${renderedCellValue}`;
      }
      },
      {
        accessorKey: "credits",
        header: "Creditos",
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    enableDensityToggle: false,
    data: subjectData,
    //passing the static object variant if no dynamic logic is needed
    muiSelectCheckboxProps: {
      color: "secondary", //makes all checkboxes use the secondary color
    },
    enableRowActions: false,
    columnResizeMode: "onChange",
    positionActionsColumn: "last",
    displayColumnDefOptions: {
      "mrt-row-select": {
        size: 50, //adjust the size of the row select column
        grow: false, //new in v2.8 (default is false for this column)
      },
      "mrt-row-numbers": {
        size: 40,
        grow: true, //new in v2.8 (allow this column to grow to fill in remaining space)
      },
    },

    muiTableContainerProps: {
      sx: { maxWidth: "100%" },
    },
    muiTopToolbarProps: {
      sx: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontWeight: "normal",
        fontSize: "16px",
      },
    },
  });
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={props.openModal}
      onClose={handleClose}
    >
      <DialogTitle>Materias do Currículo</DialogTitle>
      <DialogContent>
        <Box display={"grid"} className="my-5">
          <MaterialReactTable table={table} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="flex-end">
          <button
            onClick={handleClose}
            className="btn btn-primary"
          >
            Fechar
          </button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
