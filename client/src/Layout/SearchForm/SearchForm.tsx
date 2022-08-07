import "./SearchForm.scss";

import { Controller, useForm } from "react-hook-form";
import { Paper, TextField } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { useLazySearchQuery } from "../../services/stocks";

interface FormValues {
  query: string;
}

export const SearchForm = () => {
  // Redux toolkit mutation to handle query
  const [trigger, companyQuery] = useLazySearchQuery();

  // react Hook Form Definitions
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      query: "",
    },
  });

  // Function to be called on form submit
  const onSubmit = async (data: any) => {
    // Redux toolkit function to make requests to server
    await trigger(data.query);
    // React Hook Tools function to reset query input field
    reset({
      query: "",
    });
  };

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} id="queryForm">
      {errors.query && (
        <span className="errorText">{errors.query.message}</span>
      )}

      <Controller
        name={"query"}
        control={control}
        rules={{
          required: "This input is Required",
          pattern: { value: /^[a-zA-Z\s]*$/i, message: "Invalid query" },
        }}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => {
          return (
            <TextField
              onChange={onChange}
              value={value}
              label={"Company Search"}
              sx={{ mr: 1, flex: 1 }}
              placeholder="AAPL, MSFT, atc."
              inputProps={{ "aria-label": "Search company by symbol" }}
            />
          );
        }}
      />

      <Controller
        name={"query"}
        control={control}
        render={() => {
          return (
            <LoadingButton
              loading={companyQuery.isLoading}
              loadingPosition="center"
              variant="outlined"
              sx={{ height: 56 }}
              type="submit"
            >
              Search
            </LoadingButton>
          );
        }}
      />
    </Paper>
  );
};
