import { Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../services/api';
import SubjectRegistrationModel from './SubjectRegistrationModel';


export const SubjectPage = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);

    const [deleteId, setDeleteId] = useState<number>();

    useEffect(() => {
        getSubject();
    }, [reload]);

    useEffect(() => {
        if (deleteId) {
            deleteSubject();
        }
    }
    , [deleteId]);

    const getSubject = () => {
        axiosInstance
        .get('/subject')
        .then((data) => {
            setData(data.data);
            setReload(false);
        })
        .catch((e) => {
            setData([]);
            console.log(e);
        });
    };
    const deleteSubject = () => {   
        axiosInstance
        .delete(`/subject/${deleteId}`)
        .then((data) => {
            setReload(true);
        })
        .catch((e) => {
            console.log(e);
        });
    }

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
            },
          },
          {
            accessorKey: "situationEnum",
            header: "Situação",
          },
          {
            accessorKey: "credits",
            header: "Creditos",
          },
          {
            accessorKey: "CurriculumName",
            header: "Cursos Relacionados",
          },
        ],
        []
      );
      const table = useMaterialReactTable({
        columns,
        enableDensityToggle: false,
        data: data,
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
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                

            <IconButton
                onClick={() => {
                    setDeleteId(row.original.id)
                }}
            >
             <Delete color="error" />
            </IconButton>
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
        <>
            <header className="flex justify-between">
                <Typography variant="h4">Materias Cadastradas</Typography>
                <Button variant="contained" onClick={() => {
                    setOpen(!open)
                }} endIcon={<AddIcon />}>
                    Adicionar Materia
                </Button>
            </header>

            <Box display={'grid'} className="my-5">
                <MaterialReactTable table={table} />
            </Box>
            <SubjectRegistrationModel openModal={open} setOpenModal={setOpen} setReload={setReload} />
        </>
    );
};

