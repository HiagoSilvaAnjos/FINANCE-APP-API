import { IdGeneratorAdapter } from "../../adapters/index.js";
import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController
} from "../../controllers/index.js";

import {
    PostgresCreateTransactionRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository
} from "../../repositories/postgres/index.js";

import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase
} from "../../use-cases/index.js";

export const makeCreateTransactionController = () => {
    const createTransactionRepository = new PostgresCreateTransactionRepository();

    const getCreateUserByIdRepository = new PostgresGetUserByIdRepository();

    const idGeneratorAdapter = new IdGeneratorAdapter();

    const createTransactionUseCase = new CreateTransactionUseCase(createTransactionRepository, getCreateUserByIdRepository, idGeneratorAdapter);

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

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository = new PostgresDeleteTransactionRepository();

    const deleteTransactionUseCase = new DeleteTransactionUseCase(deleteTransactionRepository);

    const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCase);

    return deleteTransactionController;
};