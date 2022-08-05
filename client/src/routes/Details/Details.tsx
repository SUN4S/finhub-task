import "./Details.scss";

import { useNavigate, useParams } from "react-router";

import { useEffect } from "react";
import { useLazyStockDataQuery } from "../../services/stocks";

export const Details = () => {
  const [trigger, result] = useLazyStockDataQuery();
  const { symbol } = useParams();

  useEffect(() => {
    symbol && trigger(symbol);
  }, [symbol]);

  return <div id="details">Details</div>;
};
