import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController
} from "../../controllers/index.js";

import {
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase
} from "../../use-cases/index.js";


import {
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository
} from "../../repositories/postgres/index.js";

export const makeCreateUserUseCase = () => {

    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(postgresCreateUserRepository, getUserByEmailRepository);

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
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const deleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase, getUserByIdUseCase);

    return deleteUserController;
};