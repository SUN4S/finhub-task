import { morganRequestMiddleware, morganResponseMiddleware } from "./middleware/morgan.js";

import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import { logger } from "./config/winston.js";
import mongoose from "mongoose";
import path from "path";
import serveStatic from "serve-static";
import { router as stocks } from "./routes/StockRoutes.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(morganRequestMiddleware);
app.use(morganResponseMiddleware);
app.use(express.json());
app.use(compression());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

// Serving static website files
app.use(serveStatic(__dirname + "/build/public"));
app.use(express.static("/build/public"));

try {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.rgrkl.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`
  );
  console.log("Connected to database");
} catch (error) {
  logger.error(error.message);
  console.log(error);
}

app.use("/api/stocks", stocks);

// send html to base path, reloading on certain pages would throw 404
app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/build/public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// route to throw error 404 if route is not defined
app.all("*", (req, res) => res.status(404).json({ msg: "Page not Found" }));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
