import React from "react";
import { createRoot } from "react-dom/client";
import "@assets/styles/tailwind.css";
import MainRouter from "./routes/index";
import { HashRouter } from "react-router-dom";
import PropsProvider from "@contexts/UserContext";
import "./popup.css";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(
    <HashRouter>
      <PropsProvider>
        <MainRouter />
      </PropsProvider>
    </HashRouter>
  );
}

init();
