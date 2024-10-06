import { createRoot } from "react-dom/client";

import React from "react";
import { Provider } from "react-redux";
import { NotificationProvider } from "./common/context/NotificationContext.tsx";
import store from "./common/redux/store.js";

import { RouterProvider } from "react-router-dom";
import SystemRoutes from "./common/routes/Routes.tsx";

import { PrimeReactProvider } from "primereact/api";

import "primeflex/primeflex.css"; // flex
import "primeicons/primeicons.css"; //icons
import "primereact/resources/primereact.css"; //core css
import "primereact/resources/themes/mdc-dark-indigo/theme.css"; //theme
import "./styles/global.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationProvider>
      <Provider store={store}>
        <PrimeReactProvider>
          <RouterProvider router={SystemRoutes} />
        </PrimeReactProvider>
      </Provider>
    </NotificationProvider>
  </React.StrictMode>
);
