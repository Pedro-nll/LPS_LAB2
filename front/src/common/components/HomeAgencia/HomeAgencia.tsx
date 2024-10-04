import {
    Button,
    Checkbox,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from './Api';

const HomeAgencia = () => {
    const HOST = "http://localhost:8080"
    const [vehicles, setVehicles] = useState([]);
    const [open, setOpen] = useState(false);
    const [AgenciaId, setAgenciaId] = useState()
    const [currentVehicle, setCurrentVehicle] = useState({
        matricula: '',
        ano: 0,
        marca: '',
        modelo: '',
        placa: '',
        alugado: false,
        imageUrl: '',
        AgenciaId: AgenciaId,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAgencia()
    }, []);
    useEffect(() => {
        fetchVehicles()

    }, [AgenciaId])

    const getAgencia = () => {
        api.get(`${HOST}/agencia`).then((response) => {
            console.log(response.data.id)
            setAgenciaId(response.data.id)

        })
    }
    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const response = await api.get(`${HOST}/veiculo/findByAgenciaId/${AgenciaId}`);
            setVehicles(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            setVehicles([]);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setIsEditing(false);
        setCurrentVehicle({
            matricula: '',
            ano: 0,
            marca: '',
            modelo: '',
            placa: '',
            alugado: false,
            imageUrl: '',
            AgenciaId: AgenciaId,
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCurrentVehicle({
            ...currentVehicle,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await api.post(`${HOST}/veiculo/update`, currentVehicle);
            } else {
                await api.post(`${HOST}/veiculo/save`, currentVehicle);
            }
            fetchVehicles();
            handleClose();
        } catch (error) {
            console.error('Error saving/updating vehicle:', error);
        }
    };

    const handleEdit = (vehicle) => {
        setCurrentVehicle(vehicle);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (matricula) => {
        try {
            await api.post(`${HOST}/veiculo/delete?matricula=${matricula}`);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Vehicle Management
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add New Vehicle
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Matricula</TableCell>
                            <TableCell>Ano</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Modelo</TableCell>
                            <TableCell>Placa</TableCell>
                            <TableCell>Alugado</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7}>Loading...</TableCell>
                            </TableRow>
                        ) : Array.isArray(vehicles) && vehicles.length > 0 ? (
                            vehicles.map((vehicle) => (
                                <TableRow key={vehicle.matricula}>
                                    <TableCell>{vehicle.matricula}</TableCell>
                                    <TableCell>{vehicle.ano}</TableCell>
                                    <TableCell>{vehicle.marca}</TableCell>
                                    <TableCell>{vehicle.modelo}</TableCell>
                                    <TableCell>{vehicle.placa}</TableCell>
                                    <TableCell>{vehicle.alugado ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(vehicle)}>Edit</Button>
                                        <Button onClick={() => handleDelete(vehicle.matricula)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>No vehicles found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
                <DialogContent>
                    <TextField
                        name="matricula"
                        label="Matricula"
                        fullWidth
                        value={currentVehicle.matricula}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        name="ano"
                        label="Ano"
                        fullWidth
                        type="number"
                        value={currentVehicle.ano}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        name="marca"
                        label="Marca"
                        fullWidth
                        value={currentVehicle.marca}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        name="modelo"
                        label="Modelo"
                        fullWidth
                        value={currentVehicle.modelo}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        name="placa"
                        label="Placa"
                        fullWidth
                        value={currentVehicle.placa}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alugado"
                                checked={currentVehicle.alugado}
                                onChange={handleInputChange}
                            />
                        }
                        label="Alugado"
                    />
                    <TextField
                        name="imageUrl"
                        label="Image URL"
                        fullWidth
                        value={currentVehicle.imageUrl}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        name="AgenciaId"
                        label="Agencia ID"
                        fullWidth
                        type="number"
                        value={currentVehicle.AgenciaId}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {isEditing ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default HomeAgencia;