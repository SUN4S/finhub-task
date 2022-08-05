const express = require("express");

const {
  getData,
  symbolLookup,
  updateData,
  query,
} = require("../controllers/StockController");

const router = express.Router();

// Get specific company data by symbol
router.get("/getData/:symbol", getData);

// Return stock data with updated date interval
router.put("/updateData", updateData);

// Returns company info with prodived query
router.get("/query/:query", symbolLookup);

module.exports = router;
