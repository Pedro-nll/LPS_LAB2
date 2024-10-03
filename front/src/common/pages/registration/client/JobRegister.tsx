
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import React, { useState } from 'react';
import { FlexContainer, Sized, Space, Subtitle, Title, TwoParts, FlexColum } from '../style.ts';
        

        
import { InputMask } from 'primereact/inputmask';

type ClientRegistrationProps = {
    index: number;
}
        

const ClientRegistration: React.FC<ClientRegistrationProps> = ({index}) => {
    const [nameIntput, setNameIntput] = useState('')
    const [emailIntput, setEmailIntput] = useState('')
    const [passwordIntput, setPasswordIntput] = useState('')
    const [confirmPasswordIntput, setconfirmPasswordIntput] = useState('')

    const [rgInput, setRgInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')

    const [logradouroInput, setLogradouroInput] = useState('');
    const [numeroInput, setNumeroInput] = useState(0);
    const [complementoInput, setComplementoInput] = useState('');
    const [bairroInput, setBairroInput] = useState('');
    const [cidadeInput, setCidadeInput] = useState('');
    const [estadoInput, setEstadoInput] = useState('');
    const [cepInput, setCepInput] = useState('');

    const [numberOfJobs, setNumberOfJobs] = useState(1)


    return (
        <div>
            <Subtitle>Emprego {index}</Subtitle>
            <label htmlFor="cargo">Cargo</label>
            <InputText id="cargo" className='full-width-input' aria-errormessage={'ola'} value={nameIntput} onChange={(e) => setNameIntput(e.target.value)} />
            <Space value={15}/>
            <label htmlFor="empresa">Empresa</label>
            <InputText id="empresa" className='full-width-input' aria-errormessage={''} value={emailIntput} onChange={(e) => setEmailIntput(e.target.value)} />
            <Space value={15}/>
            <label htmlFor="rendimento">Rendimento</label>
            <InputNumber id="rendimento" minFractionDigits={2} maxFractionDigits={2} className='full-width-input' value={passwordIntput} onValueChange={(e) => setPasswordIntput(e.value)} />
            <Space value={15}/>
        </div>
            

    )
}

export default ClientRegistration