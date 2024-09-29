import { Container, TextField, Button } from '@mui/material';
import React, { ReactNode, useRef } from 'react';
import userService from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startPasswordRecovery } from '../../../redux/user/slice';
import * as Input from '../../../../styles/types/InputStyles';
import { Title } from '../style';

export const Request = (): ReactNode => {
  const navigate = useNavigate();
  const refEmail = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const sendEmail = async () => {
    const email = refEmail.current?.value ?? '';
    const result = userService.recoverpassword(email);

    result
      .then((data) => {
        dispatch(startPasswordRecovery(email));
        navigate('token');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
        <Title>Incira o seu email</Title>
        <TextField
        label={'Email:'}
        inputRef={refEmail}
        type={'email'}
        fullWidth
        margin="normal"
        sx={Input.input}
      />
      <Button onClick={sendEmail}>Enviar</Button>
    </Container>
  );
};

export default Request;
