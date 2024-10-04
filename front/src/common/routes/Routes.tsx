import { createBrowserRouter } from "react-router-dom";
import App from '../../App';
import ForgotPassword from "../pages/forgotPassword/ForgotPassword.tsx";
import ChangePassword from "../pages/forgotPassword/change/ChangePassword.tsx";
import Request from "../pages/forgotPassword/request/Request.tsx";
import CheckToken from "../pages/forgotPassword/token/CheckToken.tsx";

import LoginPage from '../pages/login/LoginPage';
import { RegistrationPage } from '../pages/registration/Registration';
import AgenciRegistration from '../pages/registration/agencia/AgenciaRegistration.tsx';
import ClientRegistration from '../pages/registration/client/ClientRegistration.tsx';
import WitchRegistration from '../pages/registration/witch/WitchRegistration.tsx';

const SystemRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

    ],
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
    children: [
      {
        path: '',
        element: <WitchRegistration />
      },
      {
        path: 'client',
        element: <ClientRegistration />
      },
      {
        path: 'agenci',
        element: <AgenciRegistration />
      }
    ]
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />,
    children: [
      {
        index: true,
        element: <Request />
      },
      {
        path: 'token',
        element: <CheckToken />
      },
      {
        path: 'changepassword',
        element: <ChangePassword />
      }
    ]
  }
]);

export default SystemRoutes;