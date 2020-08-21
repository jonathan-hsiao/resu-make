import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {AppProvider} from "./context/AppContext";
import {UserProvider} from "./context/UserContext";
import Resume from "./components/resume/Resume";

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

ReactDOM.render(
    <AppProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </AppProvider>
    ,
    document.getElementById("root")
);