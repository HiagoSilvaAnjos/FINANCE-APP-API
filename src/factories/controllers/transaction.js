import {
    CreateTransactionController,
    GetTransactionsByUserIdController
} from "../../controllers/index.js";

import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository
} from "../../repositories/postgres/index.js";

import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase
} from "../../use-cases/index.js";

export const makeCreateTransactionController = () => {
    const createTransactionRepository = new PostgresCreateTransactionRepository();

    const getCreateUserByIdRepository = new PostgresGetUserByIdRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(createTransactionRepository, getCreateUserByIdRepository);

    const createTransactionController = new CreateTransactionController(createTransactionUseCase);

    return createTransactionController;
};

export const makeGetTransactionByUserIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getTransactionsByUserIdRepository = new PostgresGetTransactionsByUserIdRepository();

    const getTransactionsByUserIdUserCase = new GetTransactionsByUserIdUseCase(getTransactionsByUserIdRepository, getUserByIdRepository);

    const getTransactionsByUserIdController = new GetTransactionsByUserIdController(getTransactionsByUserIdUserCase);

    return getTransactionsByUserIdController;
};