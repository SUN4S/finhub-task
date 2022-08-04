import {
  useLazyStockDataQuery,
  useSearchMutation,
} from "../../services/stocks";
import { useNavigate, useParams } from "react-router";

import { useEffect } from "react";

export const Details = () => {
  // Redux toolkit mutation to handle query
  const [search, { isLoading }] = useSearchMutation();
  const [trigger, result] = useLazyStockDataQuery();
  const { symbol } = useParams();

  useEffect(() => {
    symbol && trigger(symbol);
    search({ query: "Hello There" });
  }, [symbol]);
  console.log(isLoading);
  console.log(result);

  return <div>Details</div>;
};
