import "./IntervalForm.scss";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { DateTime } from "luxon";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router";
import { useState } from "react";
import { useUpdateDataMutation } from "../../services/stocks";

export const IntervalForm = () => {
  const { symbol } = useParams();

  const [update, updateMutation] = useUpdateDataMutation();

  const [startDate, setStartDate] = useState(
    DateTime.now().minus({ weeks: 1 }).toJSDate()
  );
  const [endDate, setEndDate] = useState(DateTime.now().toJSDate());

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const queryObject = {
      symbol: symbol!,
      fromDate: DateTime.fromJSDate(startDate).toUnixInteger(),
      toDate: DateTime.fromJSDate(endDate).toUnixInteger(),
    };

    update(queryObject);
  };

  return (
    <form onSubmit={handleSubmit} id="intervalForm">
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={DateTime.now().minus({ years: 1 }).toJSDate()}
        maxDate={DateTime.now().toJSDate()}
      />

      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={DateTime.now().toJSDate()}
      />

      <LoadingButton
        loading={updateMutation.isLoading}
        loadingPosition="center"
        variant="outlined"
        sx={{ height: 56 }}
        type="submit"
      >
        Update
      </LoadingButton>
    </form>
  );
};
