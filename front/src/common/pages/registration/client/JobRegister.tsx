
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Space, Subtitle } from '../style.ts';



export type Emprego = {
    cargo: string;
    empresa: string;
    rendimento: string;
}
type ClientRegistrationProps = {
    index: number;
    setEmpregos: Dispatch<SetStateAction<Emprego[]>>;
    empregos: Emprego[];
}


const ClientRegistration: React.FC<ClientRegistrationProps> = ({ index, empregos, setEmpregos }) => {
    const [cargoInput, setCargoInput] = useState(empregos[index]?.cargo || '');
    const [empresaInput, setEmpresaInput] = useState(empregos[index]?.empresa || '');
    const [rendimentoInput, setRendimentoInput] = useState(empregos[index]?.rendimento || '');

    const handleInputChange = () => {
        const updatedEmpregos = [...empregos];
        updatedEmpregos[index] = { cargo: cargoInput, empresa: empresaInput, rendimento: rendimentoInput };
        setEmpregos(updatedEmpregos);
    };

    useEffect(() => {
        console.log(rendimentoInput)
    }, [rendimentoInput])

    return (
        <div>
            <Subtitle>Emprego {index + 1}</Subtitle>
            <label htmlFor="cargo">Cargo</label>
            <InputText
                id="cargo"
                className='full-width-input'
                aria-errormessage={'ola'}
                value={cargoInput}
                onChange={(e) => {
                    setCargoInput(e.target.value);
                    handleInputChange();
                }}
            />
            <Space value={15} />
            <label htmlFor="rendimento">Rendimento</label>
            <InputNumber
                id="rendimento"
                minFractionDigits={2}
                maxFractionDigits={2}
                className='full-width-input'
                value={rendimentoInput}
                onValueChange={(e) => {
                    setRendimentoInput(e.value);
                    handleInputChange();
                }}
            />
            <Space value={15} />
            <label htmlFor="empresa">Empresa</label>
            <InputText
                id="empresa"
                className='full-width-input'
                aria-errormessage={''}
                value={empresaInput}
                onChange={(e) => {
                    setEmpresaInput(e.target.value);
                    handleInputChange();
                }}
            />
            <Space value={15} />

        </div>
    );
}

export default ClientRegistration