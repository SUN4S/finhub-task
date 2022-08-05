const DateTime = require("luxon").DateTime;
const axios = require("axios");
require("dotenv").config();

// Returns Company data with provided query symbol
const symbolLookup = async (req, res) => {
  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.query}&token=${process.env.FINHUB_API_KEY}`
  );
  return res.status(200).json(response.data);
};

// Generates a preliminary array of data
/*
  Params :symbol(string)
*/
const getData = async (req, res) => {
  // Initial dates are for one week data
  const fromDate = DateTime.now().minus({ weeks: 1 }).toUnixInteger();
  const toDate = DateTime.now().toUnixInteger();

  // Axios request to get data for provided params
  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=D&from=${fromDate}&to=${toDate}&token=${process.env.FINHUB_API_KEY}`
  );
  return res.status(200).json(response.data);
};

// Generates a preliminary array of data
/*
  body: {
    symbol: string,
    fromDate: number,
    toDate: number
  }
*/
const updateData = async (req, res) => {
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  // );
  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/candle?symbol=${req.body.symbol}&resolution=D&from=${fromDate}&to=${toDate}&token=${process.env.FINHUB_API_KEY}`
  );
  return res.status(200).json(response.data);
};

module.exports = {
  getData,
  updateData,
  symbolLookup,
};
