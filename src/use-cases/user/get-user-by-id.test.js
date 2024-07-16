import { faker } from "@faker-js/faker";
import { GetUserByIdUseCase } from "./get-user-by-id.js";

describe("GeyUserByIdUseCase", () => {

    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 })
    };

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

        const executeSpy = jest.spyOn(getUserByIdRepository, "execute");

        await getUserByIdUseCase.execute(user.id);

        expect(executeSpy).toHaveBeenCalledWith(user.id);

    });

});