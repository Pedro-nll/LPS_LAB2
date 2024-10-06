import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { useState } from 'react';
import { Space, Title } from '../style.ts';

import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { useNotification } from "../../../hooks/useNotification.ts";

const AgenciRegistration = () => {
    const [nameIntput, setNameIntput] = useState('')
    const [emailIntput, setEmailIntput] = useState('')
    const [passwordIntput, setPasswordIntput] = useState('')
    const [confirmPasswordIntput, setconfirmPasswordIntput] = useState('')
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const register = () => {
        if (passwordIntput !== confirmPasswordIntput) {
            showNotification({ message: "As senhas não coincidem", type: 'warning', autoHideDuration: 4000, title: "Senhas" });
            return
        }
        axios.post('http://localhost:8080/agencia/save', {
            name: nameIntput,
            email: emailIntput,
            password: passwordIntput
        }).then(() => {
            showNotification({ message: "Olá Nova Agencia, cadastre seus carro!!", type: 'success', autoHideDuration: 4000, title: "Seja bem vinda!!" });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }).catch((error) => {
            showNotification({ message: error.response.data.message, type: 'error', autoHideDuration: 4000, title: error.response.data.tittle });
        })
    }

    return (
        <>
            <img src="/cars/agenciaRegister.png" alt="Left Background" style={{ position: "absolute", left: 0, top: "20vh", height: "80vh", width: "100%", zIndex: 0 }} />

            <div className="flex justify-content-center" style={{ paddingTop: "20vh", position: "relative", }}>

                <div className='flex flex-column h-40rem' style={{ backdropFilter: "blur(35px)", padding: "10vh", borderRadius: "16px", border:"2px solid" }}>
                    <Title>Cadastro de Agência</Title>
                    <Space value={20} />

                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" className='full-width-input' aria-errormessage={'ola'} value={nameIntput} onChange={(e) => setNameIntput(e.target.value)} />
                        <Space value={15} />
                        <label htmlFor="email">Email</label>
                        <InputText id="email" className='full-width-input' aria-errormessage={''} value={emailIntput} onChange={(e) => setEmailIntput(e.target.value)} />
                        <Space value={15} />
                        <label htmlFor="senha">Senha</label>
                        <Password id="senha" inputClassName="w-full"
                            className=" w-full"
                            pt={{ iconField: { root: { className: 'w-full' } } }}
                            value={passwordIntput} onChange={(e) => setPasswordIntput(e.target.value)} toggleMask />                        <Space value={15} />
                        <label htmlFor="senha-confirm">Cofirmar Senha</label>
                        <Password id="senha-confirm" inputClassName="w-full"
                            className=" w-full"
                            pt={{ iconField: { root: { className: 'w-full' } } }}
                            value={confirmPasswordIntput} onChange={(e) => setconfirmPasswordIntput(e.target.value)} toggleMask />
                        <Space value={15} />

                    <Space value={20} />
                    <Button label="Cadastrar" className='full-width-input' onClick={register} />
                    <Space value={5} />
                    <Button label="Já Tenho uma Conta" className='full-width-input' text onClick={() => navigate('/login')} />
                </div>
            </div>
        </>



    )
}

export default AgenciRegistration