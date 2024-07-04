import "dotenv/config.js";
import express from "express";

import {
    makeCreateUserUseCase,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController
} from "./src/factories/controllers/user.js";

import { makeCreateTransactionController, makeGetTransactionByUserIdController } from "./src/factories/controllers/transaction.js";

const app = express();

app.use(express.json());

app.post("/api/users", async (request, response) => {

    const createUserController = makeCreateUserUseCase();

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (request, response) => {

    const getUserByIdController = makeGetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {

    const updateUserController = makeUpdateUserController();

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (request, response) => {

    const deleteUserController = makeDeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(request);

    response.status(statusCode).send(body);
});

// Transactions

app.post("/api/transactions", async (request, response) => {
    const createTransactionController = makeCreateTransactionController();

    const { statusCode, body } = await createTransactionController.execute(request);

    response.status(statusCode).send(body);
});

app.get("/api/transactions", async (request, response) => {
    const getTransactionsByUserIdController = makeGetTransactionByUserIdController();

    const { statusCode, body } = await getTransactionsByUserIdController.execute(request);

    response.status(statusCode).send(body);
});

app.listen(5454, () => console.log("listening on port 5454"));