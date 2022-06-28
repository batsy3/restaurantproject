import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {StateProvider} from './context/stateProvider'
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reducer from "./context/reducer";
import { initialState } from "./context/initialState";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState = {initialState} reducer= {reducer}>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
);
