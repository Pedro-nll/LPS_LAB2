import React, { useEffect, useState } from 'react';
import { Modal, Button, TextField, Box, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import axiosInstance from '../../services/api';

interface CreateDisciplineModalProps {
  openModal: boolean;
  editId: number | undefined;
  setEditId: (id: number | undefined) => void;
  setOpenModal: (open: boolean) => void;
  setReload: (reload: boolean) => void;
}

interface Course {
    id: number;
    name: string;
}

interface Curriculum {
  id: number;
  credits: number;
  course: Course;
}

const CreateDisciplineModal: React.FC<CreateDisciplineModalProps> = ({ openModal, editId, setEditId, setOpenModal, setReload }) => {
  const [name, setName] = useState('');
  const [credits, setCredits] = useState<number | string>('');
  const [curriculumsId, setCurriculumsId] = useState<number[]>([]);
  const [availableCurriculums, setAvailableCurriculums] = useState<Curriculum[]>([]);

  useEffect(() => {
    if (editId !== undefined) {
      fetchDiscipline();
    } else {
      fetchCurriculums();
    }
  }, [editId]);

  const fetchDiscipline = async () => {
    try {
      const response = await axiosInstance.get(`/discipline/${editId}`);
      const {id, name, credits, curriculumsIds } = response.data; 
      setName(name);
      setCredits(credits);
      setCurriculumsId(curriculumsIds);
    } catch (error) {
      console.error(error);
    }
    fetchCurriculums();
  };

  const fetchCurriculums = async () => {
    try {
      const response = await axiosInstance.get('/curriculum');
      setAvailableCurriculums(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setCurriculumsId((prev) =>
      prev.includes(value) ? prev.filter((id) => id !== value) : [...prev, value]
    );
  };

  const handleSave = async () => {
    const obj = { name, credits: Number(credits), curriculumsId }; 
    try {
      if (editId !== undefined) {
        await axiosInstance.put(`/discipline/${editId}`, obj);
      } else {
        await axiosInstance.post('/discipline', obj);
      }
      setReload(true);
      setOpenModal(false);
      setEditId(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ width: 400, p: 3, bgcolor: 'background.paper', margin: 'auto', marginTop: '100px' }}>
        <h2 id="modal-title">{editId !== undefined ? 'Edit Discipline' : 'Add Discipline'}</h2>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Credits"
          fullWidth
          type="number"
          margin="normal"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
        />
        <FormControl fullWidth margin="normal">
          <FormGroup>
            {availableCurriculums.map((curriculum) => (
              <FormControlLabel
                key={curriculum.id}
                control={
                  <Checkbox
                    checked={curriculumsId.includes(curriculum.id) || false}
                    onChange={handleCheckboxChange}
                    value={curriculum.id}
                  />
                }
                label={curriculum.course.name + " - " + curriculum.id}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateDisciplineModal;
