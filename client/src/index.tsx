import { Dashboard } from "./routes/Dashboard/Dashboard";
import React from "react";
import ReactDOM from "react-dom/client";

// Creating root for React to inject code into
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <h1>Hello World</h1>
    <Dashboard />
  </React.StrictMode>
);
