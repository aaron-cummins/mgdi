import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App";

import { ContextProvider } from "./contexts/ContextProvider";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { LoginContextProvider } from "./contexts/LoginContext";
import { SnackbarProvider } from "notistack";

const msalInstance = new PublicClientApplication(msalConfig);

// Optional - This will update account state if a user signs in from another tab or window
msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <MsalProvider instance={msalInstance}>
      <LoginContextProvider>
        <SnackbarProvider maxSnack={2}>
          <App />
        </SnackbarProvider>
      </LoginContextProvider>
    </MsalProvider>
  </ContextProvider>
);
