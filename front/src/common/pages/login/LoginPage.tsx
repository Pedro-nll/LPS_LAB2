import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, UserLogin } from '../../helpers/types.ts';
import { login } from '../../redux/user/slice.js';
import userService from '../../services/userService.ts';
import Validade from '../../utils/Validate.tsx';
import { ErrorText, Space, Title } from './style.ts';

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
        <>
            <img src="/cars/loginLeft.png" alt="Left Background" style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "50%", transform: "translateX(-20%)", zIndex: 0, objectFit: "contain" }} />
            <img src="/cars/loginRight.png" alt="Right Background" style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "50%", zIndex: 0, objectFit: "contain", }} />
            <div className="flex justify-content-center" style={{ paddingTop: "20vh", position: "relative", }}>
                <div className='flex flex-column h-40rem' style={{ backgroundColor: "white", padding: "10vh", borderRadius: "16px" }}>
                    <Title>Login</Title>
                    <Space value={20} />
                    <form onSubmit={onSubmit}>
                        <label htmlFor="email">Email</label>
                        <InputText id="email" className='full-width-input' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                        <Space value={15} />

                        <label htmlFor="senha">Senha</label>
                        <Password id="senha" className='full-width-input' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} inputClassName='full-width-input' />

                        <Space value={20} />

                        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

                        <Button type="submit" label="Login" className='full-width-input' />
                        <Space value={5} />
                        <Button type="button" label="Cadastro" className='full-width-input' text onClick={() => navigate('/registration')} />
                    </form>
                </div>
            </div>
        </>

    );
};

export default LoginPage;
