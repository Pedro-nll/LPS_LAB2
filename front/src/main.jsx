import { createRoot } from "react-dom/client";

import React from "react";
import { Provider } from "react-redux";
import { NotificationProvider } from "./common/context/NotificationContext.tsx";
import store from "./common/redux/store.js";
import "./styles/global.css";

import { RouterProvider } from "react-router-dom";
import SystemRoutes from "./common/routes/Routes.tsx";


import { PrimeReactProvider } from 'primereact/api';
        
        
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <NotificationProvider>
      <Provider store={store}>
        <PrimeReactProvider >
          <RouterProvider router={SystemRoutes} />
        </PrimeReactProvider>
        </Provider>
      </NotificationProvider>
  </React.StrictMode>
);
