import { faker } from "@faker-js/faker";
import { GetTransactionsByUserIdUseCase } from "./get-transactions-by-id.js";

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

});