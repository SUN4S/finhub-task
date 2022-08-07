import "./Details.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { CenterContainer } from "../../components/CenterContainer/CenterContainer";
import { IntervalForm } from "../../Layout/IntervalForm/IntervalForm";
import { LoadingBox } from "../../components/LoadingBox/LoadingBox";
import { PriceChart } from "../../components/PriceChart/PriceChart";
import { RootState } from "../../app/store";
import { useLazyStockDataQuery } from "../../services/stocks";
import { useSelector } from "react-redux";

export const Details = () => {
  // Getting parametes from page url
  const { symbol } = useParams();

  // getting historic data from redux store
  const historicData = useSelector((state: RootState) => state.historicStock);

  // Redux toolkit API function to make requests
  const [trigger, historicQuery] = useLazyStockDataQuery();

  useEffect(() => {
    // using RTK function to call request with provided symbol
    symbol && trigger(symbol);
  }, []);

  return (
    <div id="details">
      <h2>Symbol: {symbol}</h2>
      <IntervalForm />
      <CenterContainer>
        {historicData.isLoading ? (
          <LoadingBox />
        ) : historicData.isSuccess &&
          !(Object.keys(historicData.data).length === 0) ? (
          <PriceChart Close={historicData.data.c} Time={historicData.data.t} />
        ) : (
          <h2>Failed to fetch data</h2>
        )}
      </CenterContainer>
    </div>
  );
};
