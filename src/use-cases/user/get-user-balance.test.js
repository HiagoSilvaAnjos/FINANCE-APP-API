import { faker } from "@faker-js/faker";
import { GetUserBalanceUseCase } from "./get-user-balance.js";

describe("GetUserBalanceUseCase", () => {

    class GetUserBalanceRepositoryStub {
        async execute() {
            return {
                userId: faker.string.uuid(),
                earnings: "2000",
                expenses: "1000",
                investments: "500",
                balance: "500"
            };
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 })
            };
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

});