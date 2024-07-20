import express from "express";

import { usersRouter, transactionsRouter } from "./routes/index.js";

export const app = express();

app.use(express.json());

// user
app.use("/api/users", usersRouter);

// Transactions
app.use("/api/transactions", transactionsRouter);
