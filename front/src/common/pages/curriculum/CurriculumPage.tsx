import { Delete, Visibility } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../services/api';
import { DisciplinesCurriculumModel } from './DisciplinesCurriculumModel';


export const CurriculumPage = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    const [disciplines, setDisciplines] = useState([]);
    const [deleteId, setDeleteId] = useState<number>();
    useEffect(() => {
        getCurriculum();
    }, [reload]);

    useEffect(() => {
        if (deleteId) {
            deleteCurriculum();
        }
    }, [deleteId]);

    const getCurriculum = () => {
        axiosInstance
            .get('/curriculum')
            .then((data) => {
                setData(data.data);
                setReload(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const deleteCurriculum = () => {
        axiosInstance
            .delete(`/curriculum/${deleteId}`)
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
                accessorKey: 'course.name', 
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
                        setDisciplines(row.original.disciplines)
                        console.log(row.original.disciplines)
                    }}
                >
                 <Visibility/>
                </IconButton>
                    
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
                <Typography variant="h4">Currículos</Typography>
        
            </header>

            <Box display={'grid'} className="my-5">
                <MaterialReactTable table={table} />
              
            </Box>
            <DisciplinesCurriculumModel openModal={open} setOpenModal={setOpen} disciplines={disciplines} setDisciplines={setDisciplines} setReload={setReload} />
        </>
    );
};

