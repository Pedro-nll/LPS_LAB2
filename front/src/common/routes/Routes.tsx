import { createBrowserRouter } from "react-router-dom";
import App from '../../App.jsx';

import HomeAgencia from "../components/HomeAgencia/HomeAgencia.tsx";
import { RegisterAndLoginLayout } from "../layouts/RegisterAndLoginLayout.tsx";
import HomePage from '../pages/home/HomePage.tsx';
import LoginPage from '../pages/login/LoginPage.tsx';
import { RegistrationPage } from '../pages/registration/Registration.tsx';
import AgenciRegistration from '../pages/registration/agencia/AgenciaRegistration.tsx';
import ClientRegistration from '../pages/registration/client/ClientRegistration.tsx';
import WitchRegistration from '../pages/registration/witch/WitchRegistration.tsx';

const SystemRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: '/HomeAgencia',
        element: <HomeAgencia />
      }
    ],
  },
  {
    path: '/login',
    element: <RegisterAndLoginLayout>
      <LoginPage />
    </RegisterAndLoginLayout>
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

  }
]);

export default SystemRoutes;