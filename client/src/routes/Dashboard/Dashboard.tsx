import "./Dashboard.scss";

import { CenterContainer } from "../../components/CenterContainer/CenterContainer";
import { Divider } from "@mui/material";
import { GeneralList } from "../../Layout/GeneralList/GeneralList";
import { LoadingBox } from "../../components/LoadingBox/LoadingBox";
import { RootState } from "../../app/store";
import { SearchForm } from "../../Layout/SearchForm/SearchForm";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  // Geting general stock data from redux store
  const generalData = useSelector((state: RootState) => state.generalStock);

  return (
    <div id="dashboard">
      <SearchForm />
      <Divider sx={{ my: 1 }} />
      {generalData.isLoading ? (
        <CenterContainer>
          <LoadingBox />
        </CenterContainer>
      ) : generalData.isSuccess ? (
        <GeneralList data={generalData.data} />
      ) : Object.keys(generalData.data).length === 0 ? (
        <CenterContainer>
          <h2>Search for a company</h2>
        </CenterContainer>
      ) : (
        <CenterContainer>
          <h2>Failed to get Data</h2>
        </CenterContainer>
      )}
    </div>
  );
};
