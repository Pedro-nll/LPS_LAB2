import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axiosInstance from '../../services/api';
import CreateDisciplineModal from './CreateDisciplineModal';

interface Curriculum {
  curriculumId: number;
  courseName: string;
}

interface Discipline {
  id: number;
  name: string;
  credits: number;
  curriculums: Curriculum[];
}

export const DisciplinePage = () => {
  const [data, setData] = useState<Discipline[]>([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(true);
  const [editId, setEditId] = useState<number | undefined>();
  const [deleteId, setDeleteId] = useState<number | undefined>();

  useEffect(() => {
    fetchDisciplines();
  }, [reload]);

  useEffect(() => {
    if (deleteId !== undefined) {
      deleteDiscipline();
    }
  }, [deleteId]);

  const fetchDisciplines = async () => {
    try {
      const response = await axiosInstance.get('/discipline');
      setData(response.data);
      setReload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDiscipline = async () => {
    try {
      await axiosInstance.delete(`/discipline/${deleteId}`);
      setReload(true);
    } catch (error) {
      console.error(error);
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
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'credits',
        header: 'Credits',
      },
      {
        accessorKey: 'curriculumsIds',
        header: 'Currículos',
        Cell: ({ cell }: any) => cell.getValue().join(', '),
      },
    ],
    [],
  );
  

  const table = useMaterialReactTable({
    columns,
    data,
    enableDensityToggle: false,
    enableRowActions: true,
    columnResizeMode: 'onChange',
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-select': {
        size: 50,
        grow: false,
      },
      'mrt-row-numbers': {
        size: 40,
        grow: true,
      },
    },
    renderRowActions: ({ row }: any) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <IconButton
          onClick={() => {
            setOpen(true);
            setEditId(row.original.id);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => {
            setDeleteId(row.original.id);
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
        <Typography variant="h4">Disciplines</Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(!open)}
          endIcon={<AddIcon />}
        >
          Add Discipline
        </Button>
      </header>

      <Box display={'grid'} className="my-5">
        <MaterialReactTable table={table} />
      </Box>
      <CreateDisciplineModal
        openModal={open}
        editId={editId}
        setEditId={setEditId}
        setOpenModal={setOpen}
        setReload={setReload}
      />
    </>
  );
};
