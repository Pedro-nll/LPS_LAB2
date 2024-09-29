import { Button, Container, TextField } from '@mui/material';
import React, { useRef } from 'react';
import userService from '../../../services/userService';
import { useSelector } from 'react-redux';
import { UserToken } from '../../../helpers/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmedToken } from '../../../redux/user/slice';
import * as Input from '../../../../styles/types/InputStyles';
import { Title } from '../style';

const CheckToken = () => {
    const refToken = useRef<HTMLInputElement>(null);
    const { forgotPasswordUser } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendToken = async () => {
        const token = refToken.current?.value ?? '';

        console.log({forgotPasswordUser})

        const userToken: UserToken = {
            email: forgotPasswordUser.email,
            token: token,
        };

        const result = await userService.checktoken(userToken);
        
        if(result) {
            dispatch(confirmedToken(token))
            navigate('../changepassword')
        }
    };

    return (
        <Container>
            <Title>Incira o token recebido pelo email</Title>
            <TextField
                label={'Token:'}
                inputRef={refToken}
                type={'text'}
                placeholder={'Incira o token recebido por email'}
                fullWidth
                margin="normal"
                sx={Input.input}
                slotProps={{
                    input: {
                      inputMode: 'text', // Define que o campo aceita texto
                      style: { textTransform: 'uppercase' }, // Garante que o texto apareça em maiúsculas
                      onInput: (event: React.FormEvent<HTMLInputElement>) => {
                        const target = event.target as HTMLInputElement;
                        target.value = target.value.toUpperCase();
                      },
                    },
                  }}
            />
            <Button onClick={sendToken}>Enviar</Button>
        </Container>
    );
};

export default CheckToken;
