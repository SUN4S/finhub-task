import "./App.scss";

import { Container } from "@mui/system";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <Container>
      <div id="App">
        <Header />
        <Outlet />
      </div>
    </Container>
  );
};
