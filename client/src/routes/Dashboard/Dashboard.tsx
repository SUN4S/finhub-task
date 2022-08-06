import "./Dashboard.scss";

import { SearchForm } from "../../Layout/SearchForm/SearchForm";
import { useEffect } from "react";

export const Dashboard = () => {
  return (
    <div id="dashboard">
      <SearchForm />
    </div>
  );
};
