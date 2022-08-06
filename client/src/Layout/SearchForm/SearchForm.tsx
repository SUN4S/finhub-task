import "./SearchForm.scss";

import { Controller, useForm } from "react-hook-form";
import { Paper, TextField } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import { useLazySearchQuery } from "../../services/stocks";

interface FormValues {
  query: string;
}

export const SearchForm = () => {
  // Redux toolkit mutation to handle query
  const [trigger, companyQuery] = useLazySearchQuery();

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

  const onSubmit = async (data: any) => {
    await trigger(data.query);
    reset({
      query: "",
    });
  };

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} id="queryForm">
      {errors.query && <span>{errors.query.message}</span>}

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
              sx={{ ml: 1, mr: 1, flex: 1 }}
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
