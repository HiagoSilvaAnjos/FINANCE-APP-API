import { GetUserByIdUseCase } from "./get-user-by-id.js";
import { user } from "../../tests/index.js";

describe("GeyUserByIdUseCase", () => {

    class GetUserByIdRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getUserByIdRepository = new GetUserByIdRepositoryStub();

        const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

        return {
            getUserByIdUseCase,
            getUserByIdRepository
        };
    };

    it("should return user by id successfully", async () => {

        const { getUserByIdUseCase } = makeSut();

        const result = await getUserByIdUseCase.execute(user.id);

        expect(result).toEqual(user);

    });

    it("should call getUserByIdRepository with correct params", async () => {

        const { getUserByIdUseCase, getUserByIdRepository } = makeSut();

        const executeSpy = import.meta.jest.spyOn(getUserByIdRepository, "execute");

        await getUserByIdUseCase.execute(user.id);

        expect(executeSpy).toHaveBeenCalledWith(user.id);

    });

    it("should Throws if getUserByIdRepository Throws", () => {

        const { getUserByIdUseCase, getUserByIdRepository } = makeSut();

        import.meta.jest.spyOn(getUserByIdRepository, "execute").mockRejectedValue(new Error());

        const promise = getUserByIdUseCase.execute(user.id);

        expect(promise).rejects.toThrow();
    });

});