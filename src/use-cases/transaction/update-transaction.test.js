import { faker } from "@faker-js/faker";
import { UpdateTransactionUseCase } from "./update-transaction.js";


describe("UpdateTransactionUseCase", () => {

    const transaction = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: "EXPENSE",
        amount: Number(faker.finance.amount()),
    };

    class UpdateTransactionRepositoryStub {
        async execute() {
            return transaction;
        }
    }

    const makeSut = () => {
        const updateTransactionRepository = new UpdateTransactionRepositoryStub();

        const updateTransactionUseCase = new UpdateTransactionUseCase(updateTransactionRepository);

        return {
            updateTransactionUseCase,
            updateTransactionRepository
        };

    };

    it("should create a transaction successfully", async () => {

        const { updateTransactionUseCase } = makeSut();

        const result = await updateTransactionUseCase.execute(transaction.id, {
            amount: Number(faker.finance.amount()),
        });

        expect(result).toEqual(transaction);

    });

});