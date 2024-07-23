import express from "express";
import { usersRouter, transactionsRouter } from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// user
app.use("/api/users", usersRouter);

// Transactions
app.use("/api/transactions", transactionsRouter);

// Documentação
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "../docs/swagger.json"), "utf8"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app };