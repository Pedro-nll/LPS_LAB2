import { Container } from '@mui/material';
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Title } from './style'

export const ForgotPassword = (): ReactNode => {

    return (
        <Container>
            <Box>
                <Outlet />
            </Box>
        </Container>
    );
};

export default ForgotPassword;
