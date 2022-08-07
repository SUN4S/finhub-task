import "./GeneralList.scss";

import { Button, Card } from "@mui/material";

import { GeneralStockState } from "../../models/stocks";
import { useNavigate } from "react-router";

export const GeneralList = (props: { data: GeneralStockState }) => {
  // React Router functions to redirect
  const navigate = useNavigate();

  // function that handles redirecting to new page
  const handleClick = () => {
    navigate(`/${props.data.ticker}`);
  };

  return (
    <div id="generalContainer">
      <Card sx={{ height: "100%" }} className="card">
        <h3>Logo:</h3>
        <div className="cardContent">
          <img src={props.data.logo} />
        </div>
      </Card>
      <Card sx={{ height: "100%" }} className="card">
        <h3>Name:</h3>
        <div className="cardContent">
          <div>{props.data.name}</div>
        </div>
      </Card>
      <Card sx={{ height: "100%" }} className="card">
        <h3>Symbol(Ticker):</h3>
        <div className="cardContent">
          <div>{props.data.ticker}</div>
        </div>
      </Card>
      <Card sx={{ height: "100%" }} className="card">
        <h3>Country:</h3>
        <div className="cardContent">
          <div>{props.data.country}</div>
        </div>
      </Card>
      <Card sx={{ height: "100%" }} className="card">
        <h3>Currency:</h3>
        <div className="cardContent">
          <div>{props.data.currency}</div>
        </div>
      </Card>
      <Card sx={{ height: "100%" }} className="card">
        <h3>Exchange:</h3>
        <div className="cardContent">
          <div>{props.data.exchange}</div>
        </div>
      </Card>
      <Card sx={{ height: "100%" }} className="card">
        <h3>URL:</h3>
        <div className="cardContent">
          <a href={props.data.weburl} target="blank">
            {props.data.weburl}
          </a>
        </div>
      </Card>
      <Card sx={{ height: "100%" }} className="card">
        <h3>History:</h3>
        <div className="cardContent">
          <Button onClick={handleClick} sx={{ height: "100%", width: "100%" }}>
            Price History
          </Button>
        </div>
      </Card>
    </div>
  );
};
