import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./app/redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/">
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
