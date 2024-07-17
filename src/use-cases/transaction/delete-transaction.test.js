import { faker } from "@faker-js/faker";
import { DeleteTransactionUseCase } from "./delete-transaction.js";

describe("DeleteTransactionUseCase", () => {

    const transaction = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: "EXPENSE",
        amount: Number(faker.finance.amount()),
    };

    class DeleteTransactionRepositoryStub {
        async execute() {
            return transaction;
        }
    }

    const makeSut = () => {

        const deleteTransactionRepository = new DeleteTransactionRepositoryStub();

        const deleteTransactionUseCase = new DeleteTransactionUseCase(deleteTransactionRepository);

        return {
            deleteTransactionUseCase,
            deleteTransactionRepository
        };

    };

    it("should delete a transaction successfully", async () => {

        const { deleteTransactionUseCase } = makeSut();

        const result = await deleteTransactionUseCase.execute(transaction.id);

        expect(result).toEqual(transaction);

    });

});