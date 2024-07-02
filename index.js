import "dotenv/config.js";
import express from "express";

import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController
} from "./src/controllers/index.js";

import {
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase
} from "./src/use-cases/index.js";


import {
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
    DeleteUserRepository,
    PostgresGetUserByEmailRepository
} from "./src/repositories/postgres/index.js";


const app = express();

app.use(express.json());

app.post("/api/users", async (request, response) => {

    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(postgresCreateUserRepository, getUserByEmailRepository);

    const createUserController = new CreateUserController(createUserUseCase);

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (request, response) => {

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {

    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(postgresUpdateUserRepository, getUserByEmailRepository);

    const updateUserController = new UpdateUserController(updateUserUseCase);

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (request, response) => {

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const deleteUserRepository = new DeleteUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase, getUserByIdUseCase);

    const { statusCode, body } = await deleteUserController.execute(request);

    response.status(statusCode).send(body);
});

app.listen(5454, () => console.log("listening on port 5454"));