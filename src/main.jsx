import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./tokens/design-tokens.css";
import "./styles/main.css";
import "./styles/media.css";
import "./styles/react-polish.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
