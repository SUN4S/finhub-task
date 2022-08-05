const compression = require("compression");
const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const stocks = require("./routes/StockRoutes");

const app = express();

app.use(express.json());
app.use(compression());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

// Serving static website files
app.use(require("serve-static")(__dirname + "/build/public"));
app.use(express.static("/build/public"));

try {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.rgrkl.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`
  );
  console.log("Connected to database");
} catch (error) {
  console.log(error);
}

app.use("/api/stocks", stocks);

// send html to base path, reloading on certain pages would throw 404
app.get("/*", (req, res) => {
  res.sendFile(
    path.join(process.cwd(), "/build/public/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// route to throw error 404 if route is not defined
app.all("*", (req, res) => res.status(404).json({ msg: "Page not Found" }));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
