import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { useState } from 'react';
import { CenterFlexContainer, Sized, Space, Title } from '../style.ts';



import { useNavigate } from 'react-router-dom';

const AgenciRegistration = () => {
    const [nameIntput, setNameIntput] = useState('')
    const [emailIntput, setEmailIntput] = useState('')
    const [passwordIntput, setPasswordIntput] = useState('')
    const [confirmPasswordIntput, setconfirmPasswordIntput] = useState('')

    const navigate = useNavigate();
    const register = () => {
        if (passwordIntput !== confirmPasswordIntput) {
            alert('As senhas não coincidem')
            return
        }
        axios.post('http://localhost:8080/agencia/save', {
            name: nameIntput,
            email: emailIntput,
            password: passwordIntput
        }).then(() => {
            alert('Cadastro realizado com sucesso')
            navigate('/login')
        }).catch(() => {
            alert('Erro ao realizar cadastro')
        })
    }

    return (
        <CenterFlexContainer>
            <Title>Cadastro de Agência</Title>
            <Space value={20} />

            <div>
                <label htmlFor="nome">Nome</label>
                <InputText id="nome" className='full-width-input' aria-errormessage={'ola'} value={nameIntput} onChange={(e) => setNameIntput(e.target.value)} />
                <Space value={15} />
                <label htmlFor="email">Email</label>
                <InputText id="email" className='full-width-input' aria-errormessage={''} value={emailIntput} onChange={(e) => setEmailIntput(e.target.value)} />
                <Space value={15} />
                <label htmlFor="senha">Senha</label>
                <InputText id="senha" className='full-width-input' value={passwordIntput} onChange={(e) => setPasswordIntput(e.target.value)} />
                <Space value={15} />
                <label htmlFor="senha-confirm">Cofirmar Senha</label>
                <InputText id="senha-confirm" className='full-width-input' aria-errormessage={''} value={confirmPasswordIntput} onChange={(e) => setconfirmPasswordIntput(e.target.value)} />
                <Space value={15} />
            </div>

            <Sized width={'320px'}>
                <Space value={20} />
                <Button label="Cadastrar" className='full-width-input'  onClick={register}/>
                <Space value={5} />
                <Button label="Já Tenho uma Conta" className='full-width-input' text onClick={() => navigate('/login')} />
            </Sized>

        </CenterFlexContainer>


    )
}

export default AgenciRegistration