import { faker } from "@faker-js/faker";
import { GetTransactionsByUserIdUseCase } from "./get-transactions-by-id.js";
import { UserNotFoundError } from "../../errors/user";

describe("GetTransactionsByUserId", () => {

    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 })
    };


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
        jest
            .spyOn(getUserByIdRepository, "execute")
            .mockResolvedValueOnce(null);
        const id = faker.string.uuid();

        const promise = getTransactionsByUserIdUseCase.execute(id);

        await expect(promise).rejects.toThrow(new UserNotFoundError(id));
    });

    it("should call GetUserByIdRepository with correct params", async () => {

        const { getTransactionsByUserIdUseCase, getUserByIdRepository } = makeSut();
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            "execute",
        );
        const id = faker.string.uuid();

        await getTransactionsByUserIdUseCase.execute(id);

        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(id);
    });

    it("should call GetTransactionsByUserIdRepository with correct params", async () => {

        const { getTransactionsByUserIdUseCase, getTransactionsByUserIdRepository } = makeSut();
        const getTransactionsByUserIdRepositorySpy = jest.spyOn(
            getTransactionsByUserIdRepository,
            "execute",
        );
        const id = faker.string.uuid();

        await getTransactionsByUserIdUseCase.execute(id);

        expect(getTransactionsByUserIdRepositorySpy).toHaveBeenCalledWith(id);
    });

    it("should throw if GetUserByIdRepository throws", async () => {

        const { getTransactionsByUserIdUseCase, getUserByIdRepository } = makeSut();
        jest
            .spyOn(getUserByIdRepository, "execute")
            .mockRejectedValueOnce(new Error());
        const id = faker.string.uuid();

        const promise = getTransactionsByUserIdUseCase.execute(id);

        await expect(promise).rejects.toThrow();
    });

});