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

    it("should call DeleteTransactionRepository with correct params", async () => {

        const { deleteTransactionUseCase, deleteTransactionRepository } = makeSut();

        const executeSpy = jest.spyOn(deleteTransactionRepository, "execute");

        const transactionId = faker.string.uuid();

        await deleteTransactionUseCase.execute(transactionId);

        expect(executeSpy).toHaveBeenCalledWith(transactionId);

    });

    it("should Throws if DeleteTransactionRepository throws", async () => {

        const { deleteTransactionUseCase, deleteTransactionRepository } = makeSut();

        jest.spyOn(deleteTransactionRepository, "execute").mockRejectedValue(new Error());

        const promise = deleteTransactionUseCase.execute(transaction.id);

        expect(promise).rejects.toThrow();

    });

});