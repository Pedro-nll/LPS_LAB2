import {
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
import api from '../../services/api';
import { Button } from 'primereact/button';

import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Automovel, AluguelInfo } from '../../helpers/types';
import axios from 'axios';

const HomeAgencia = () => {
    const HOST = "http://localhost:8080"
    const [vehicles, setVehicles] = useState<Automovel[]>([]);
    const [open, setOpen] = useState(false);
    const [AgenciaId, setAgenciaId] = useState()
    const [activeIndex, setActiveIndex] = useState(0);
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
    
    console.log("Veiculos", vehicles)

    useEffect(() => {
        getAgencia()

        

    }, []);
    useEffect(() => {
        fetchVehicles()

    }, [AgenciaId])

    const getAgencia = () => {
        const agencia = JSON.parse(localStorage.getItem('user') )
        setAgenciaId(agencia.id)
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

    const imageBodyTemplate = (automovel : AluguelInfo) => {
        return <img src={automovel.imageUrl || ''} alt={automovel.modelo || ''} className="w-6rem shadow-2 border-round" />;
    };

    const aceitar = (id: number) => {
        api.post(`${HOST}/aluguel/acceptAluguel/${id}`)
        getAgencia();
    }
    
    const recusar = (id: number) => {
        api.post(`${HOST}/aluguel/recAluguel/${id}`)
        getAgencia();
    }

    console.log(vehicles)

    const test = (vehicle : AluguelInfo) => {
        console.log('test')
        console.log(vehicle)

        return (
            <div>
                <Button label='Aceitar' onClick={() => aceitar(vehicle.id || 0)}/>
                <Button label='Recusar' onClick={() => recusar(vehicle.id || 0)}/>
            </div>
        )
    }

    const alugueis: AluguelInfo[] = vehicles
        .map((vehicle): AluguelInfo | null => {
            if (!vehicle || !vehicle.aluguel || vehicle.aluguel.length === 0) {
            return null;
            }

            const maiorAluguel = vehicle.aluguel.reduce(
            (prev, curr) => (curr?.id && prev?.id && curr.id > prev.id ? curr : prev),
            vehicle.aluguel[0]
            );

            if (maiorAluguel?.situacao === "APROVADOPELOBANCO" && maiorAluguel?.valorMensal !== null) {
            return {
                id: maiorAluguel.id || 0,
                imageUrl: vehicle.imageUrl ?? "",
                matricula: vehicle.matricula ?? "",
                ano: vehicle.ano ?? 0,
                marca: vehicle.marca ?? "",
                modelo: vehicle.modelo ?? "",
                placa: vehicle.placa ?? "",
                valorMensal: maiorAluguel.valorMensal || 0
            };
            }

            return null;
        })
        .filter((aluguel): aluguel is AluguelInfo => aluguel !== null);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Vehicle Management
            </Typography>

            <div className="flex mb-2 gap-2 justify-content-end">
                <Button onClick={() => setActiveIndex(0)} className='w10' label="Automoveis" />
                <Button onClick={() => setActiveIndex(1)} className='w10' label="Aluguel" />
            </div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel>
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {isEditing ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
                </TabPanel>

                <TabPanel>
                    <DataTable value={alugueis} tableStyle={{ minWidth: '50rem' }}>
                        <Column body={imageBodyTemplate} header="imagem"></Column>
                        <Column field="matricula" header="matricula"></Column>
                        <Column field="ano" header="ano"></Column>
                        <Column field="marca" header="marca"></Column>
                        <Column field="modelo" header="modelo"></Column>
                        <Column field="valorMensal" header="Valor"></Column>
                        <Column body={test} header="actions"></Column>
                    </DataTable>

                </TabPanel>
            </TabView>

        </Container>
    );
};

export default HomeAgencia;

/*
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {isEditing ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
*/