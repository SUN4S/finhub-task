import "./Details.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { IntervalForm } from "../../Layout/IntervalForm/IntervalForm";
import { RootState } from "../../app/store";
import { toggleFirst } from "../../features/FirstLoadSlice";
import { useLazyStockDataQuery } from "../../services/stocks";
import { useSelector } from "react-redux";

export const Details = () => {
  const { symbol } = useParams();

  const historicData = useSelector((state: RootState) => state.historicStock);
  const firstLoad = useSelector((state: RootState) => state.firstLoad);

  const [trigger, historicQuery] = useLazyStockDataQuery();

  useEffect(() => {
    if (!firstLoad) {
      symbol && trigger(symbol);
      toggleFirst({ loaded: false });
    }
  }, []);

  console.log(historicData.data);

  return (
    <div id="details">
      <h2>Symbol: {symbol}</h2>
      <IntervalForm />
    </div>
  );
};
