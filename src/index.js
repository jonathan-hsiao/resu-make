import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {AppProvider} from "./context/AppContext";
import {UserProvider} from "./context/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <AppProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </AppProvider>
    ,
    document.getElementById("root")
);