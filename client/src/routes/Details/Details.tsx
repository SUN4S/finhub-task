import "./Details.scss";

import { useNavigate, useParams } from "react-router";

import { DateTime } from "luxon";
import { useEffect } from "react";
import { useState } from "react";
import { useStockDataQuery } from "../../services/stocks";

export const Details = () => {
  const { symbol } = useParams();

  const queryObject = useStockDataQuery(symbol!);

  console.log(queryObject.data);

  return <div id="details">Details</div>;
};
