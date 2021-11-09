import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@chakra-ui/core";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  rootElement
);
