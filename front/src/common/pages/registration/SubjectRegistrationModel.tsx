import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

import Checkbox from "@mui/material/Checkbox";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";
import { useNotification } from "../../hooks/useNotification";
import axiosInstance from "../../services/api";
interface ISubjectRegistrationModelProps {
  openModal: boolean;
  data: [];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<boolean>>;
  registrationID: number;
}

const SubjectRegistrationModel = (props: ISubjectRegistrationModelProps) => {
  const [subjectsIds, setSubjectsIds] = React.useState<number[]>([]);
  const [subjectData, setData] = React.useState<any[]>([]);

  useEffect(() => {
    setSubjectsIds([]);
    setData(props.data);
  }, [props.openModal]);
  const { showNotification } = useNotification();

  const removeSubject = () => {
    const subjectTORemove = {
      registrationId: props.registrationID,
      subjectsIds: [],
    };
    
    subjectTORemove.subjectsIds = subjectsIds;

    axiosInstance
      .delete(`/registration/subjects`, { data: subjectTORemove })
      .then(() => {
        props.setReload(true);
        setData(subjectData.filter((item: any) => !subjectsIds.includes(item.id)));

        if (subjectData.length === subjectsIds.length) {
          props.setOpenModal(false);
          showNotification({
            message: "Sua matrícula foi cancelada com sucesso",
            type: "success",
            title: "Matrícula Cancelada",
          });
        } else {
          showNotification({
            message: "Matérias removidas com sucesso",
            type: "success",
            title: "Matérias removidas",
          });
        }
        props.setReload(true);
      })
      .catch((e) => {
        showNotification({
            message: e.response.data.message,
            type: "error",
            title: e.response.data.title,
          });
      });
  };

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
        accessorKey: "discipline.name",
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
        accessorKey: "situation",
        header: "Situação",
      },
      {
        accessorKey: "discipline.credits",
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
    enableRowActions: true,
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
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <Checkbox className="checkBox" 
          onClick={() => {
            if (row.original.id && subjectsIds.includes(row.original.id)) {
              setSubjectsIds(
                subjectsIds.filter((item) => item !== row.original.id)
              );
            } else {
              setSubjectsIds([...subjectsIds, row.original.id as number]);
            }
          }}
        />
      </Box>
    ),

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
      <DialogTitle>Materias Matriculadas</DialogTitle>
      <DialogContent>
        <Box display={"grid"} className="my-5">
          <MaterialReactTable table={table} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={removeSubject} variant="outlined">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SubjectRegistrationModel;
