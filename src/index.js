import React from "react";
import ReactDOM from "react-dom/client"; // Update import for React 18
import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider";
import { BrowserRouter } from "react-router-dom";
import { ContextProviderHeader } from "./contexts/ContextProviderHeader";
import TopLevel from "./TopLevel";
import { ContextProviderApp } from "./contexts/ContextProviderApp";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ContextProvider>
      <ContextProviderHeader>
        <ContextProviderApp>
          <TopLevel />
        </ContextProviderApp>
      </ContextProviderHeader>
    </ContextProvider>
  </BrowserRouter>
);
