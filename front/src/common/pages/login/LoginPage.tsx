import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import React from 'react';
import { useDispatch } from 'react-redux';
import { User, UserLogin } from '../../helpers/types.ts';
import { login } from '../../redux/user/slice.js';
import userService from '../../services/userService.ts';
import Validade from '../../utils/Validate.tsx';
import { Container, Space, Title } from './style.ts';

const LoginPage = () => {
    const navigate = useNavigate();

    const [emailIntput, setEmailIntput] = useState('')
    const [passwordIntput, setpasswordIntput] = useState('')

    //const [emailError, setEmailError] = useState(falPe);
    //const [emailHelperText, setEmailHelperText] = useState('');
    //const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch()

    const validade = new Validade();
    
    useEffect(() => {
        const localUser = localStorage.getItem("user");

        if (localUser === null) {
            return
        }
        
        const user = JSON.parse(localUser);
        dispatch(login(user))

        navigate('/home')
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = refEmail.current?.value || '';
        const password = refPassword.current?.value || '';
        const isEmailValid = validade.validateEmail(email);

        const userLogin : UserLogin = {
            email: email,
            password: password,
        }

        setEmailError(!isEmailValid);

        if (!isEmailValid) {
            setEmailHelperText('Please enter a valid email.');
        } else {
            setEmailHelperText('');
        }

        if (!isEmailValid) return;

        try {
            const user : User = await userService.login(userLogin) 
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(login(user))
            navigate("/home")
        }
        catch(err) {
            console.log(err)
        }

    };

    return (
        <Container>
            <Title>Login</Title>
            <Space value={20}/>

            <label htmlFor="email">Email</label>
            <InputText id="email" className='full-width-input' aria-errormessage={''} value={emailIntput} onChange={(e) => setEmailIntput(e.target.value)} />

            <Space value={15}/>

            <label htmlFor="senha">Senha</label>
            <InputText id="senha" className='full-width-input' value={passwordIntput} onChange={(e) => setpasswordIntput(e.target.value)} />

            <Space value={20}/>

            <Button label="Login" className='full-width-input'/>
            <Space value={5}/>
            <Button label="Cadastro" className='full-width-input' text/>

        </Container>
    );
};

export default LoginPage;
