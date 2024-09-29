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
interface IStudentRegistrationInSubjectProps {
  openModal: boolean;
  data: [];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<boolean>>;
}
interface SubjectDataToRemove {
  registrationId: number;
  subjectsIds: number[];
}
const StudentRegistrationInSubject = (props: IStudentRegistrationInSubjectProps) => {
  const [subjectData, setData] = React.useState<any[]>([]);

  useEffect(() => {
    setData(props.data);
  }, [props.openModal]);


  const handleClose = () => {
    props.setOpenModal(false);
  };

  useEffect(() => {}, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        grow: true,
      },
      {
        accessorKey: "name",
        header: "Nome",
      },
      {
        accessorKey: "email",
        header: "Email",
      }
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
      <DialogTitle>Alunos Matriculados</DialogTitle>
      <DialogContent>
        <Box display={"grid"} className="my-5">
          <MaterialReactTable table={table} />
        </Box>
      </DialogContent>
      <DialogActions>
      
      </DialogActions>
    </Dialog>
  );
};
export default StudentRegistrationInSubject;
