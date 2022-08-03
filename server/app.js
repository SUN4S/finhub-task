const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config;
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

try {
  mongoose.connect(`mongodb://mongo:27017/`);
  console.log("Connected to database");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  return res.send("Hello World");
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
