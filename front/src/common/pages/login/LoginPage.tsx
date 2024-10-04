import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, UserLogin } from '../../helpers/types.ts';
import { login } from '../../redux/user/slice.js';
import userService from '../../services/userService.ts';
import Validade from '../../utils/Validate.tsx';
import { Container, Space, Title, ErrorText } from './style.ts';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validade = new Validade();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if (localUser !== null) {
            const user = JSON.parse(localUser);
            dispatch(login(user));
            navigateBasedOnUserType(user.userType);
        }
    }, []);

    const navigateBasedOnUserType = (userType) => {
        if (userType === "isAgencia") {
            navigate('/HomeAgencia');
        } else {
            navigate('/home');
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');

        const email = emailInput;
        const password = passwordInput;
        const isEmailValid = validade.validateEmail(email);

        if (!isEmailValid) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        const userLogin: UserLogin = {
            email: email,
            password: password,
        };

        try {
            const response: User = await userService.login(userLogin);
            localStorage.setItem("user", JSON.stringify(response));
            dispatch(login(response));
            navigateBasedOnUserType(response.userType);
        } catch (err) {
            console.error('Login error:', err);
            setErrorMessage(err.response?.data?.message || 'An error occurred during login. Please try again.');
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

                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

                <Button type="submit" label="Login" className='full-width-input' />
                <Space value={5}/>
                <Button type="button" label="Cadastro" className='full-width-input' text onClick={() => navigate('/registration')}/>
            </form>
        </Container>
    );
};

export default LoginPage;
