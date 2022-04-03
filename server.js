const express = require("express");
const axios = require("axios");
const app = express();

if (process.env.NOD_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
}
let key = process.env.key;

const port = process.env.port || 8000;
app.listen(port, () => console.log("Server running successfully"));
