import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState } from 'react';
import { Automovel, Rent } from "../../helpers/types";
import api from '../../services/api';
export interface rentCarModelProps {
    open: boolean;
    onClose: () => void;
    automovel: Automovel | undefined;
    setAutomovel: (automovel: Automovel) => void;
}
export const RentCarModal = ({ open, onClose, automovel, setAutomovel }: rentCarModelProps) => {


    useEffect(() => {
        setVisible(open);
        fethBancos();
    }, [open]);
    const getUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }
    const registerRent = () => {
        setRent({
            automovelMatricula: automovel?.matricula || '',
            valorMensal: rentPrice,
            valorPendente: rentPrice,
            atrasado: false,
            ativo: true,
            taxaJuros: 0,
            agenciaId: automovel?.agencia?.id,
            banco: selectedBanco?.id,
            clienteId: user.id
        })
        api.post('/aluguel/save', rent).then((response) => {
            console.log(response.data);
            setAutomovel(undefined);
            onClose();
        }
        ).catch((error) => {
            console.error('Error registering rent:', error);
        });


    }

    const [visible, setVisible] = useState(open);
    const user = getUserData();
    const [bancos, setBancos] = useState<any[]>([]);
    const [selectedBanco, setSelectedBanco] = useState<any>();
    const [rent, setRent] = useState<Rent>();
    const [rentPrice, setRentPrice] = useState<number>(0);
    const fethBancos = () => {
        api.get('/banc').then((response) => {
            setBancos(response.data);
        }).catch((error) => {
            console.error('Error fetching bancos:', error);
            setBancos([]);
        });
    }
    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-4">

            <span className="font-bold white-space-nowrap">Alugar {automovel?.marca}</span>
        </div>
    );



    return (
        <Dialog visible={visible} modal header={headerElement} onHide={() => { if (!visible) return; setVisible(false); }}>
            <div className="card flex flex-column align-items-center justify-content-center" style={{ padding: "10px" }}>
                <img src={automovel?.imageUrl} alt={automovel?.modelo} className="w-2 shadow-2 border-round" />
                <div className='flex flex-row gap-4 ' style={{ padding: '20px' }}>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">$</span>
                        <InputNumber placeholder="Price" onChange={(e) => { setRentPrice(e.value) }} />
                        <span className="p-inputgroup-addon">.00</span>
                    </div>

                    <div className="p-inputgroup flex-1">
                        <Dropdown inputId="dd-city" value={selectedBanco} onChange={(e) => setSelectedBanco(e.value)} options={bancos}
                            optionLabel="name" className="w-full" checkmark={true} highlightOnSelect={false} placeholder="Selecione um banco"
                        />
                    </div>



                </div>
                <div>
                    <Button label="cancel" icon="pi pi-times" onClick={onClose} autoFocus />

                    <Button label="confirm" icon="pi pi-check" onClick={registerRent} autoFocus />
                </div>
            </div>
        </Dialog>
    )
}