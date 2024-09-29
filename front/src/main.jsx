import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { NotificationProvider } from "./common/context/NotificationContext.tsx";
import store from "./common/redux/store.js";
import "./styles/global.css";
import { Theme } from "./styles/themes/theme.tsx";

import { RouterProvider } from "react-router-dom";
import SystemRoutes from "./common/routes/Routes.tsx";

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import './style.css'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <NotificationProvider>
        <Provider store={store}>
          <RouterProvider router={SystemRoutes} />
        </Provider>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
