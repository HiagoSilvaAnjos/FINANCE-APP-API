import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
    GetUserBalanceController
} from "../../controllers/index.js";

import {
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
} from "../../use-cases/index.js";


import {
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserBalanceRepository
} from "../../repositories/postgres/index.js";

import { PasswordHasherAdapter } from "../../adapters/index.js";

export const makeCreateUserUseCase = () => {

    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const passwordHasherAdapter = new PasswordHasherAdapter();

    const createUserUseCase = new CreateUserUseCase(postgresCreateUserRepository, getUserByEmailRepository, passwordHasherAdapter);

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(postgresUpdateUserRepository, getUserByEmailRepository);

    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeDeleteUserController = () => {

    const deleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
};

export const makeGetUserBalanceController = () => {

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserBalanceRepository = new PostgresGetUserBalanceRepository();

    const getUserBalanceUseCase = new GetUserBalanceUseCase(getUserBalanceRepository, getUserByIdRepository);

    const getUserBalanceController = new GetUserBalanceController(getUserBalanceUseCase);

    return getUserBalanceController;
};