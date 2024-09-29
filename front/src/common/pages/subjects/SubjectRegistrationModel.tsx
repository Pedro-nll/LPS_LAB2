import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

import Checkbox from "@mui/material/Checkbox";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
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
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const SubjectRegistrationModel = (props: ISubjectRegistrationModelProps) => {
  const [teachersIds, setTeachersIds] = React.useState<number[]>([]);
  const [disciplineId, setDisciplineId] = React.useState<number>();
  const [disciplineData, setDisciplineData] = React.useState<any[]>([]);
  const [teachersData, setTeachers] = React.useState<any[]>([]);
const [value, setValue] = React.useState<number>();
  useEffect(() => {
    setTeachersIds([]);
    setDisciplineId(undefined);
    getCurse();
    getTeachers();
  }, [props.openModal]);

  const { showNotification } = useNotification();

  const getCurse = () => {
    axiosInstance
      .get(`/discipline`)
      .then((response) => {
        console.log(response);
        setDisciplineData(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const getTeachers = () => {
    axiosInstance
      .get(`/teacher`)
      .then((response) => {
        console.log(response);
        setTeachers(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const makeRegistration = () => {
    axiosInstance.post("/subject", {
        disciplineId: disciplineId,
        teachersIds: teachersIds,
        price: value}).then((response) => {
        showNotification({
            message: response.data.message,
            type: "success",
            title: response.data.title,
            });
        props.setReload(true);
        props.setOpenModal(false);
    }).catch((e) => {
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
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    enableDensityToggle: false,
    data: teachersData,
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
        <Checkbox
          className="checkBox"
          onClick={() => {
            if (row.original.id && teachersIds.includes(row.original.id)) {
              setTeachersIds(
                teachersIds.filter((item) => item !== row.original.id)
              );
            } else {
              setTeachersIds([...teachersIds, row.original.id as number]);
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
      <DialogTitle>Materias disponiveis</DialogTitle>
      <DialogContent>
        <Box display={"grid"} className="my-5">
          <Box display={"grid"} className="my-5 gap-5">
            <FormControl fullWidth>
              <InputLabel id="course-select-label">
                Selecione uma Disciplina
              </InputLabel>
              <Select
                labelId="course-select-label"
                value={disciplineId}
                onChange={(e) => setDisciplineId(e.target.value as number)}
                fullWidth
              >
                <MenuItem value="">
                  <em>Selecione um </em>
                </MenuItem>
                {disciplineData.map((discipline) => (
                  <MenuItem key={discipline.id} value={discipline.id}>
                    {discipline.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel> Informe um valor</InputLabel>
              <Input type="number" id="value" onChange={(e) => {setValue(e.target.value)}} />
            </FormControl>
          </Box>

          <MaterialReactTable table={table} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={makeRegistration} variant="outlined">
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SubjectRegistrationModel;
