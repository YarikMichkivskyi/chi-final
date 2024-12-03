import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";


const domContainer = document.getElementById('root');
const root = ReactDOM.createRoot(domContainer!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
