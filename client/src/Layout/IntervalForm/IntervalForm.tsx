import "./IntervalForm.scss";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { DateTime } from "luxon";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router";
import { useState } from "react";
import { useUpdateDataMutation } from "../../services/stocks";

export const IntervalForm = () => {
  // React router function to get params from url
  const { symbol } = useParams();

  // Redux Toolkit mutation to handle post/put requests
  const [update, updateMutation] = useUpdateDataMutation();

  // State that saves start date
  const [startDate, setStartDate] = useState(
    DateTime.now().minus({ weeks: 1 }).toJSDate()
  );
  // state that saved end date
  const [endDate, setEndDate] = useState(DateTime.now().toJSDate());

  // Form submit function
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Creating a new object that will be sent to the server
    const queryObject = {
      symbol: symbol!,
      // Luxon functions to handle dates
      fromDate: DateTime.fromJSDate(startDate).toUnixInteger(),
      toDate: DateTime.fromJSDate(endDate).toUnixInteger(),
    };

    //Redux Toolkit function to call request with new object
    await update(queryObject);
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
