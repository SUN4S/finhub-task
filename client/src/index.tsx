import "./styles/normalize.css";
import "./styles/index.scss";

import { Route, Routes } from "react-router";

import { App } from "./Layout/App/App";
import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "./routes/Dashboard/Dashboard";
import { Details } from "./routes/Details/Details";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store";

// Creating root for React to inject code into
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="/:symbol" element={<Details />} />
          </Route>
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
    </Provider>
  </React.StrictMode>
);
