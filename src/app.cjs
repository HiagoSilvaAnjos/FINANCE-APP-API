const express = require("express");
const { usersRouter, transactionsRouter } = require("./routes/index.js");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

// user
app.use("/api/users", usersRouter);

// Transactions
app.use("/api/transactions", transactionsRouter);

// Documentação
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "../docs/swagger.json"), "utf8"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = { app };