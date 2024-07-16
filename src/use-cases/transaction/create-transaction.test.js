import { faker } from "@faker-js/faker";
import { CreateTransactionUseCase } from "./create-transaction";

describe("CreateTransactionUseCase", () => {

    const createTransactionParams = {
        user_id: faker.string.uuid(),
        name: faker.string.alphanumeric(10),
        date: faker.date.anytime().toISOString(),
        amount: Number(faker.finance.amount()),
        type: "EARNING"
    };

    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 })
    };

    class CreateTransactionRepositoryStub {
        async execute(transaction) {
            return transaction;

        }
    }

    class GetUserByIdRepositoryStub {
        async execute(userId) {
            return { ...user, id: userId };

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

        expect(transaction).toEqual({ ...createTransactionParams, id: "generate_id" });

    });

});