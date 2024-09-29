import { Visibility } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../services/api';
import RegistrationRegisterModel from './RegistrationModal';
import SubjectRegistrationModel from './SubjectRegistrationModel';


export const RegistrationPage = () => {
    const [data, setData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);
    const [registrationId, setRegistrationId] = useState();
    const [open, setOpen] = useState(false);
    const [openRegisterModel, setOpenRegisterModel] = useState(false);
    const [reload, setReload] = useState(true);

    const { user } = useSelector(state => state.userReducer);

    useEffect(() => {
        getRegistration();
    }, [reload]);


    const getRegistration = () => {
       if(user && user.id){
        axiosInstance
        .get('/registration/student/' + user.id)
        .then((data) => {
            setData(data.data);
            setReload(false);
        })
        .catch((e) => {
            console.log(e);
        });
       }
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
            },
            {
                accessorKey: 'course.credits', 
                header: 'Credito do Curso',
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
                        setSubjectData(row.original.subjects);
                        setRegistrationId(row.original.id);
                        setOpen(true);
                    }}
                >
                 <Visibility />
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
                <Typography variant="h4">Matriculas</Typography>
                <Button variant="contained" onClick={() => {
                    setOpenRegisterModel(!openRegisterModel)
                }} endIcon={<AddIcon />}>
                    Adicionar Matricula
                </Button>
            </header>

            <Box display={'grid'} className="my-5">
                <MaterialReactTable table={table} />
              
            </Box>
            <SubjectRegistrationModel openModal={open} registrationID={registrationId} data={subjectData} setOpenModal={setOpen} setReload={setReload} />
            <RegistrationRegisterModel openModal={openRegisterModel} setReload={setReload} setOpenModal={setOpenRegisterModel} />
        </>
    );
};

