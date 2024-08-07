import { CreateTransactionUseCase } from "./create-transaction";
import { UserNotFoundError } from "../../errors/user";
import { transaction, user } from "../../tests/index.js";

describe("CreateTransactionUseCase", () => {

    const createTransactionParams = {
        ...transaction,
        id: undefined,
    };

    class CreateTransactionRepositoryStub {
        async execute() {
            return transaction;

        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user;

        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return "generate_id";
        }
    }

    const makeSut = () => {
        const createTransactionRepository = new CreateTransactionRepositoryStub();
        const getUserByIdRepository = new GetUserByIdRepositoryStub();
        const idGeneratorAdapter = new IdGeneratorAdapterStub();

        const createTransactionUseCase = new CreateTransactionUseCase(createTransactionRepository, getUserByIdRepository, idGeneratorAdapter);

        return {
            createTransactionUseCase, createTransactionRepository, getUserByIdRepository, idGeneratorAdapter
        };

    };

    it("should create a transaction successfully", async () => {

        const { createTransactionUseCase } = makeSut();

        const transaction = await createTransactionUseCase.execute(createTransactionParams);

        expect(transaction).toEqual(transaction);

    });

    it("should call GetUserByIdRepository with correct params", async () => {

        const { createTransactionUseCase, getUserByIdRepository } = makeSut();
        const getUserByIdRepositorySpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            "execute",
        );

        await createTransactionUseCase.execute(createTransactionParams);

        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(
            createTransactionParams.user_id,
        );
    });

    it("should call IdGeneratorAdapter", async () => {

        const { createTransactionUseCase, idGeneratorAdapter } = makeSut();
        const idGeneratorAdapterSpy = import.meta.jest.spyOn(
            idGeneratorAdapter,
            "execute",
        );

        await createTransactionUseCase.execute(createTransactionParams);

        expect(idGeneratorAdapterSpy).toHaveBeenCalled();
    });

    it("should call CreateUserRepository with correct params", async () => {

        const { createTransactionUseCase, createTransactionRepository } = makeSut();
        const createTransactionRepositorySpy = import.meta.jest.spyOn(
            createTransactionRepository,
            "execute",
        );

        await createTransactionUseCase.execute(createTransactionParams);

        expect(createTransactionRepositorySpy).toHaveBeenCalledWith({
            ...createTransactionParams,
            id: "generate_id",
        });
    });

    it("should throw UserNotFoundError if user does not exist", async () => {

        const { createTransactionUseCase, getUserByIdRepository } = makeSut();
        import.meta.jest.spyOn(getUserByIdRepository, "execute").mockResolvedValueOnce(null);

        const promise = createTransactionUseCase.execute(createTransactionParams);

        await expect(promise).rejects.toThrow(
            new UserNotFoundError(createTransactionParams.user_id),
        );
    });

    it("should throw if GetUserByIdRepository throws", async () => {

        const { createTransactionUseCase, getUserByIdRepository } = makeSut();
        import.meta.jest.spyOn(getUserByIdRepository, "execute").mockRejectedValueOnce(new Error());

        const promise = createTransactionUseCase.execute(createTransactionParams);

        await expect(promise).rejects.toThrow();
    });

    it("should throw if IdGeneratorAdapter throws", async () => {

        const { createTransactionUseCase, idGeneratorAdapter } = makeSut();
        import.meta.jest.spyOn(idGeneratorAdapter, "execute").mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = createTransactionUseCase.execute(createTransactionParams);

        await expect(promise).rejects.toThrow();
    });

    it("should throw if CreateTransactionRepository throws", async () => {

        const { createTransactionUseCase, createTransactionRepository } = makeSut();
        import.meta.jest.spyOn(createTransactionRepository, "execute").mockRejectedValueOnce(new Error());

        const promise = createTransactionUseCase.execute(createTransactionParams);

        await expect(promise).rejects.toThrow();
    });

});
