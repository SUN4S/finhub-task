import "./Dashboard.scss";

import { useSearchMutation } from "../../services/stocks";

export const Dashboard = () => {
  // Redux toolkit mutation to handle query
  const [search, { isLoading }] = useSearchMutation();

  return <div id="dashboard">Dashboard</div>;
};
