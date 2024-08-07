import { faker } from "@faker-js/faker";
import { GetUserBalanceUseCase } from "./get-user-balance.js";
import { UserNotFoundError } from "../../errors/user";
import { user, userBalance } from "../../tests/index.js";

describe("GetUserBalanceUseCase", () => {

    class GetUserBalanceRepositoryStub {
        async execute() {
            return userBalance;
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {

        const getUserBalanceRepository = new GetUserBalanceRepositoryStub();
        const getUserByIdRepository = new GetUserByIdRepositoryStub();

        const getUserBalanceUseCase = new GetUserBalanceUseCase(getUserBalanceRepository, getUserByIdRepository);

        return {
            getUserBalanceUseCase,
            getUserBalanceRepository,
            getUserByIdRepository
        };
    };

    it("should get user balance succesfully", async () => {

        const { getUserBalanceUseCase } = makeSut();

        const userBalance = await getUserBalanceUseCase.execute(faker.string.uuid());

        expect(userBalance).toBeTruthy();

    });

    it("should throws UserNotFoundError if getUserByIdRepository returns null", async () => {

        const { getUserBalanceUseCase, getUserByIdRepository } = makeSut();

        import.meta.jest.spyOn(getUserByIdRepository, "execute").mockResolvedValue(null);

        const userId = faker.string.uuid();

        const promise = getUserBalanceUseCase.execute(userId);

        await expect(promise).rejects.toThrow(new UserNotFoundError(userId));

    });

    it("should call getUserByIdRepository with correct values", async () => {

        const { getUserBalanceUseCase, getUserByIdRepository } = makeSut();

        const executeSpy = import.meta.jest.spyOn(getUserByIdRepository, "execute");

        const userId = faker.string.uuid();

        await getUserBalanceUseCase.execute(userId);

        expect(executeSpy).toHaveBeenCalledWith(userId);

    });

    it("should call getUserBalanceRepository with correct values", async () => {

        const { getUserBalanceUseCase, getUserBalanceRepository } = makeSut();

        const executeSpy = import.meta.jest.spyOn(getUserBalanceRepository, "execute");

        const userId = faker.string.uuid();

        await getUserBalanceUseCase.execute(userId);

        expect(executeSpy).toHaveBeenCalledWith(userId);

    });

    it("should Throws if getUserByIdRepository Throws", () => {

        const { getUserBalanceUseCase, getUserByIdRepository } = makeSut();

        import.meta.jest.spyOn(getUserByIdRepository, "execute").mockRejectedValue(new Error());

        const promise = getUserBalanceUseCase.execute(faker.string.uuid());

        expect(promise).rejects.toThrow();
    });

    it("should Throws if getUserBalanceRepository Throws", () => {

        const { getUserBalanceUseCase, getUserBalanceRepository } = makeSut();

        import.meta.jest.spyOn(getUserBalanceRepository, "execute").mockRejectedValue(new Error());

        const promise = getUserBalanceUseCase.execute(faker.string.uuid());

        expect(promise).rejects.toThrow();
    });


});