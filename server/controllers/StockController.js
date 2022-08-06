import { DateTime } from "luxon";
import axios from "axios";
import dotenv from "dotenv";
import { logger } from "../config/winston.js";

// function to let me use environment variables
dotenv.config();

// Returns Company data with provided query symbol
/*
  Params :query(string)
*/
export const symbolLookup = async (req, res) => {
  try {
    // Axios requests API to try and find company with provided query(symbol)
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.query}&token=${process.env.FINHUB_API_KEY}`
    );

    // Checking if axios response contains any data
    if (!response.data || Object.keys(response.data) === 0) {
      logger.warn("Failed to fetch company info. Symbol: " + req.params.query);
      return res.status(404).json({ msg: "No Data Found" });
    }

    logger.info("Successfully retrieved company info. Symbol: " + req.params.query);
    return res.status(200).json(response.data);
  } catch (error) {
    logger.error(error.message);
  }
};

// Generates a preliminary array of data
/*
  Params :symbol(string)
*/
export const getData = async (req, res) => {
  // Initial dates are for one week data
  const fromDate = DateTime.now().minus({ weeks: 1 }).toUnixInteger();
  const toDate = DateTime.now().toUnixInteger();

  try {
    // Axios request to get data for provided params
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=D&from=${fromDate}&to=${toDate}&token=${process.env.FINHUB_API_KEY}`
    );

    // checking if response data contains { "s" : "no_data" }
    // this indicates that the api failed to get data
    if (response.data.s === "no_data") {
      logger.warn(
        `Failed to fetch company info. Symbol: ${req.params.symbol}, timeframe: ${fromDate} - ${toDate}`
      );
      return res.status(404).json({ msg: "No Data Found" });
    }

    logger.info(
      `Successfully retrieved company info. Symbol: ${req.params.query}, timeframe: ${fromDate} - ${toDate}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    logger.error(error.message);
  }
};

// Generates an updated array of data
/*
  body: {
    symbol: string,
    fromDate: number,
    toDate: number
  }
*/
export const updateData = async (req, res) => {
  // Adding provided body to variables
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  try {
    // Axios request to get data for provided params
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${req.body.symbol}&resolution=D&from=${fromDate}&to=${toDate}&token=${process.env.FINHUB_API_KEY}`
    );

    // checking if response data contains { "s" : "no_data" }
    // this indicates that the api failed to get data
    if (response.data.s === "no_data") {
      logger.warn(
        `Failed to fetch company info. Symbol: ${req.params.symbol}, timeframe: ${fromDate} - ${toDate}`
      );
      return res.status(404).json({ msg: "No Data Found" });
    }

    logger.info(
      `Successfully updated company info. Symbol: ${req.params.query}, timeframe: ${fromDate} - ${toDate}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    logger.error(error.message);
  }
};
