import { createRoot } from "react-dom/client";

import React from "react";
import { Provider } from "react-redux";
import { NotificationProvider } from "./common/context/NotificationContext.tsx";
import store from "./common/redux/store.js";
import "./styles/global.css";

import { RouterProvider } from "react-router-dom";
import SystemRoutes from "./common/routes/Routes.tsx";

// _app.js
import { PrimeReactProvider } from 'primereact/api';


        
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import './style.css';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <NotificationProvider>
      <PrimeReactProvider>
        <Provider store={store}>
          <RouterProvider router={SystemRoutes} />
        </Provider>
        </PrimeReactProvider>
      </NotificationProvider>
  </React.StrictMode>
);
