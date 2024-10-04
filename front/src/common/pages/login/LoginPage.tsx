import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, UserLogin } from '../../helpers/types.ts';
import { login } from '../../redux/user/slice.js';
import userService from '../../services/userService.ts';
import Validade from '../../utils/Validate.tsx';
import { Container, Space, Title } from './style.ts';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validade = new Validade();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if (localUser !== null) {
            const user = JSON.parse(localUser);
            dispatch(login(user));
            navigate('/home');
        }
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = emailInput;
        const password = passwordInput;
        const isEmailValid = validade.validateEmail(email);

        if (!isEmailValid) return;

        const userLogin: UserLogin = {
            email: email,
            password: password,
        };

        try {
            const user: User = await userService.login(userLogin);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(login(user));
            navigate("/home");
        } catch (err) {
            console.error('Login error:', err);
            // Handle login error (e.g., show error message to user)
        }
    };

    return (
        <Container>
            <Title>Login</Title>
            <Space value={20}/>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <InputText id="email" className='full-width-input' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                <Space value={15}/>

                <label htmlFor="senha">Senha</label>
                <Password id="senha" className='full-width-input' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} inputClassName='full-width-input' />

                <Space value={20}/>

                <Button type="submit" label="Login" className='full-width-input' />
                <Space value={5}/>
                <Button type="button" label="Cadastro" className='full-width-input' text onClick={() => navigate('/registration')}/>
            </form>
        </Container>
    );
};

export default LoginPage;