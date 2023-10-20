const express = require("express");
const { dbConnection } = require("./src/database/connections");
const dbConfig = require("./src/database/config");
const mongoose = require("mongoose");
const subscriptionsRouter = require("./src/routes");
const path = require('path')

global.APP_ROOT = path.resolve(__dirname);

require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/subscriptions", subscriptionsRouter);

dbConnection(mongoose, dbConfig).connect();

module.exports = app;
