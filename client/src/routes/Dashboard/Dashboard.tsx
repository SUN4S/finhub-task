import "./Dashboard.scss";

import { useEffect } from "react";
import { useLazySearchQuery } from "../../services/stocks";

export const Dashboard = () => {
  // Redux toolkit mutation to handle query
  const [trigger, response] = useLazySearchQuery();

  useEffect(() => {
    trigger("AAPL");
  }, []);
  console.log(response.data);

  return <div id="dashboard">Dashboard</div>;
};
