const path = require("path");

require("dotenv").config();
global.APP_ROOT = path.resolve(__dirname);

const express = require("express");
const { dbConnection } = require("./database/connections");
const dbConfig = require("./database/config");
const mongoose = require("mongoose");
const subscriptionsRouter = require("./routes/subscriptions.routes");

const app = express();

app.use(express.json());

console.log({ APP_ROOT });
app.use("/subscriptions", subscriptionsRouter);

dbConnection(mongoose, dbConfig).connect();

module.exports = app;
