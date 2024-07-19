import "dotenv/config.js";
import express from "express";

import { usersRouter, transactionsRouter } from "./src/routes/index.js";

const app = express();

app.use(express.json());

// user
app.use("/api/users", usersRouter);

// Transactions
app.use("/api/transactions", transactionsRouter);

app.listen(5454, () => console.log("listening on port 5454"));