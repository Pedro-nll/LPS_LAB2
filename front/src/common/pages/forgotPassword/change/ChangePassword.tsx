import { Button, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import userService from '../../../services/userService';
import { useSelector } from 'react-redux';
import { UserRecoverPassword, UserToken } from '../../../helpers/types';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Input from '../../../../styles/types/InputStyles';
import { Title } from '../style';

const ChangePassword = () => {
    const refPassword = useRef<HTMLInputElement>(null);
    const refConfirmPassword = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { forgotPasswordUser } = useSelector(state => state.userReducer);
    const navigate = useNavigate();

    const changepassword = async () => {
        const password = refPassword.current?.value ?? ''
        const confirmPassword = refConfirmPassword.current?.value ?? ''


        if(password != confirmPassword) {
            console.log("ERRO senhas diferentes")
            return
        }

        if(password.length < 4) {
            console.log("Senha muito curta!")
            return
        }

        const userRecoverPassword : UserRecoverPassword = {
            email: forgotPasswordUser.email,
            password: password,
            token: forgotPasswordUser.token,
        }

        const result = await userService.changepassword(userRecoverPassword);
        console.log(result)
    };

    return (
        <Container>
            <Title>Incira sua nova senha</Title>
            <TextField
                id="password"
                label="Senha: "
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                sx={Input.input}
                inputRef={refPassword}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                id="password"
                label="Confirmar Senha: "
                variant="outlined"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                sx={Input.input}
                inputRef={refConfirmPassword}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button onClick={changepassword}>Enviar</Button>
        </Container>
    );
};

export default ChangePassword;
