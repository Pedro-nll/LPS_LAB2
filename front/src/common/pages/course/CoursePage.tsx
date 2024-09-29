import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../services/api';
import CreateCourseModal from './CreateCursoModal';


export const CoursePage = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    const [editId, setEditId] = useState<number>();
    const [deleteId, setDeleteId] = useState<number>();
    useEffect(() => {
        getRegistration();
    }, [reload]);

    useEffect(() => {
        if (deleteId) {
            deleteCourse();
        }
    }, [deleteId]);


    const createCurriculum = (courseId) => {
        axiosInstance
        .post('/curriculum',{"courseId": courseId})
        .then((data) => {
            setReload(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }
    const getRegistration = () => {
        axiosInstance
            .get('/course')
            .then((data) => {
                setData(data.data);
                setReload(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const deleteCourse = () => {
        axiosInstance
            .delete(`/course/${deleteId}`)
            .then((data) => {
                setReload(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', 
                header: 'ID',
                grow: true,
            },
            {
                accessorKey: 'name', 
                header: 'Curso',
            }
        ],
        [],
    );
    const table = useMaterialReactTable({
        columns,
        enableDensityToggle: false,
        data,
        //passing the static object variant if no dynamic logic is needed
        muiSelectCheckboxProps: {
            color: 'secondary', //makes all checkboxes use the secondary color
        },
        enableRowActions: true,
        columnResizeMode: 'onChange',
        positionActionsColumn: 'last',
        displayColumnDefOptions: {
            'mrt-row-select': {
                size: 50, //adjust the size of the row select column
                grow: false, //new in v2.8 (default is false for this column)
            },
            'mrt-row-numbers': {
                size: 40,
                grow: true, //new in v2.8 (allow this column to grow to fill in remaining space)
            },
        },
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                
                <IconButton
                    onClick={() => {
                        setOpen(true);
                        setEditId(row.original.id)
                    }}
                >
                 <Edit/>
                </IconButton>
                    
                <IconButton
                    onClick={() => {
                        setDeleteId(row.original.id)
                    }}
                >
                 <Delete color="error" />
                </IconButton>
                
                <IconButton
                    onClick={() => {
                        createCurriculum(row.original.id)
                    }}
                >
                 <AddIcon color="success" />
                </IconButton>
            </Box>
        ),

        muiTableContainerProps: {
            sx: { maxWidth: '100%' },
        },
        muiTopToolbarProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        muiBottomToolbarProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                fontWeight: 'normal',
                fontSize: '16px',
            },
        },
    });
    return (
        <>
            <header className="flex justify-between">
                <Typography variant="h4">Curso</Typography>
                <Button variant="contained" onClick={() => {
                    setOpen(!open)
                }} endIcon={<AddIcon />}>
                    Adicionar Curso
                </Button>
            </header>

            <Box display={'grid'} className="my-5">
                <MaterialReactTable table={table} />
              
            </Box>
            <CreateCourseModal openModal={open} editId={editId} setEditId={setEditId}setOpenModal={setOpen} setReload={setReload} />
        </>
    );
};

