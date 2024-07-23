import { faker } from "@faker-js/faker";
import { GetTransactionsByUserIdUseCase } from "./get-transactions-by-id.js";
import { UserNotFoundError } from "../../errors/user";
import { user } from "../../tests/index.js";

describe("GetTransactionsByUserId", () => {
    class GetTransactionsByUserIdRepositoryStub {
        async execute() {
            return [];
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {

        const getTransactionsByUserIdRepository = new GetTransactionsByUserIdRepositoryStub();
        const getUserByIdRepository = new GetUserByIdRepositoryStub();

        const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(getTransactionsByUserIdRepository, getUserByIdRepository);

        return {
            getTransactionsByUserIdUseCase, getTransactionsByUserIdRepository, getUserByIdRepository
        };
    };

    it("should get transactions by user id successfully", async () => {

        const { getTransactionsByUserIdUseCase } = makeSut();

        const result = await getTransactionsByUserIdUseCase.execute(user.id);

        expect(result).toEqual([]);
    });

    it("should throw UserNotFoundError if user does not exist", async () => {

        const { getTransactionsByUserIdUseCase, getUserByIdRepository } = makeSut();
        import.meta.jest.spyOn(getUserByIdRepository, "execute").mockResolvedValueOnce(null);
        const id = faker.string.uuid();

        const promise = getTransactionsByUserIdUseCase.execute(id);

        await expect(promise).rejects.toThrow(new UserNotFoundError(id));
    });

    it("should call GetUserByIdRepository with correct params", async () => {

        const { getTransactionsByUserIdUseCase, getUserByIdRepository } = makeSut();
        const getUserByIdRepositorySpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            "execute",
        );
        const id = faker.string.uuid();

        await getTransactionsByUserIdUseCase.execute(id);

        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(id);
    });

    it("should call GetTransactionsByUserIdRepository with correct params", async () => {

        const { getTransactionsByUserIdUseCase, getTransactionsByUserIdRepository } = makeSut();
        const getTransactionsByUserIdRepositorySpy = import.meta.jest.spyOn(
            getTransactionsByUserIdRepository,
            "execute",
        );
        const id = faker.string.uuid();

        await getTransactionsByUserIdUseCase.execute(id);

        expect(getTransactionsByUserIdRepositorySpy).toHaveBeenCalledWith(id);
    });

    it("should throw if GetUserByIdRepository throws", async () => {

        const { getTransactionsByUserIdUseCase, getUserByIdRepository } = makeSut();
        import.meta.jest.spyOn(getUserByIdRepository, "execute").mockRejectedValueOnce(new Error());
        const id = faker.string.uuid();

        const promise = getTransactionsByUserIdUseCase.execute(id);

        await expect(promise).rejects.toThrow();
    });

    it("should throw if GetTransactionsByUserIdRepository throws", async () => {

        const { getTransactionsByUserIdUseCase, getTransactionsByUserIdRepository } = makeSut();
        import.meta.jest.spyOn(getTransactionsByUserIdRepository, "execute").mockRejectedValueOnce(new Error());
        const id = faker.string.uuid();


        const promise = getTransactionsByUserIdUseCase.execute(id);


        await expect(promise).rejects.toThrow();
    });

});