import "./styles/normalize.css";

import { Route, Routes } from "react-router";

import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "./routes/Dashboard/Dashboard";
import { Details } from "./routes/Details/Details";
import React from "react";
import ReactDOM from "react-dom/client";

// Creating root for React to inject code into
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:symbol" element={<Details />} />
        {/* Catch all for 404 pages */}
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404 not found</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
