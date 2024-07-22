import express from "express";

import { usersRouter, transactionsRouter } from "./routes/index.js";

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

export const app = express();

app.use(express.json());

// user
app.use("/api/users", usersRouter);

// Transactions
app.use("/api/transactions", transactionsRouter);

// Documentação
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "../docs/swagger.json"), "utf8"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));