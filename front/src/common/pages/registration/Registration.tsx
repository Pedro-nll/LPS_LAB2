import { Outlet } from 'react-router-dom';
import { RegisterAndLoginLayout } from '../../layouts/RegisterAndLoginLayout';

export const RegistrationPage = () => {

    return (
        <RegisterAndLoginLayout>
            <Outlet />
        </RegisterAndLoginLayout>
    );
};

