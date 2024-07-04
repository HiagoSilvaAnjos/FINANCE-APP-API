import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController
} from "../../controllers/index.js";

import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository
} from "../../repositories/postgres/index.js";

import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase
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

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository = new PostgresUpdateTransactionRepository();

    const updateTransactionUseCase = new UpdateTransactionUseCase(updateTransactionRepository);

    const updateTransactionController = new UpdateTransactionController(updateTransactionUseCase);

    return updateTransactionController;
};