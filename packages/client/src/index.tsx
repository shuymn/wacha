import { ZeitProvider, CssBaseline } from "@zeit-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./views/root";

(async () => {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }

  const mountNode = document.getElementById("root");
  if (!mountNode) {
    return;
  }

  ReactDOM.render(
    <BrowserRouter>
      <ZeitProvider>
        <CssBaseline />
        <Root />
      </ZeitProvider>
    </BrowserRouter>,
    mountNode
  );
})();
