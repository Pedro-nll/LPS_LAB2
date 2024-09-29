import { Visibility } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../services/api';
import StudentRegistrationInSubject from './StudentRegistrationInSubject';


export const TeacherSubjectPage = () => {
    const [data, setData] = useState([]);
    const [subjectSelectedId, setSubjectSelectedId] = useState<number>();
    const [studentData, setStudentData] = useState([]);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    
    const { user } = useSelector(state => state.userReducer);
    console.log(1,user)

    useEffect(() => {
        getSubjects();
    }, [reload]);

    useEffect(() => {   
        if (subjectSelectedId) {
            getStudents();
            
        }
    }, [subjectSelectedId]);

    const ChangeModalState = () => {
        setOpen(!open);
    };

    const getStudents = () => {
        axiosInstance
            .get(`/subject/${subjectSelectedId}/student`)
            .then((data) => {
                setStudentData(data.data);
                console.log(data.data);
                setReload(false);
                ChangeModalState()
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getSubjects = () => {
      if(user && user.id){
        axiosInstance
        .get(`/subject/${user.id}/teacher`)
        .then((data) => {
            setData(data.data);
            console.log(data.data);
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
                        setSubjectSelectedId(10 as number);
                        
                        
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
                <Typography variant="h4">Materias</Typography>
            </header>

            <Box display={'grid'} className="my-5">
                <MaterialReactTable table={table} />
              
            </Box>
            <StudentRegistrationInSubject openModal={open} data={[]} setOpenModal={setOpen} setReload={setReload} />

        </>
    );
};

