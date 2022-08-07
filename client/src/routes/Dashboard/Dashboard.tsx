import "./Dashboard.scss";

import { Divider } from "@mui/material";
import { GeneralList } from "../../Layout/GeneralList/GeneralList";
import { RootState } from "../../app/store";
import { SearchForm } from "../../Layout/SearchForm/SearchForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const generalData = useSelector(
    (state: RootState) => state.generalStock.data
  );

  return (
    <div id="dashboard">
      <SearchForm />
      <Divider sx={{ my: 1 }} />
      <GeneralList data={generalData} />
    </div>
  );
};
