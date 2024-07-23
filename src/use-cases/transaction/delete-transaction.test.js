import { faker } from "@faker-js/faker";
import { DeleteTransactionUseCase } from "./delete-transaction.js";
import { transaction } from "../../tests/index.js";

describe("DeleteTransactionUseCase", () => {

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

        const executeSpy = import.meta.jest.spyOn(deleteTransactionRepository, "execute");

        const transactionId = faker.string.uuid();

        await deleteTransactionUseCase.execute(transactionId);

        expect(executeSpy).toHaveBeenCalledWith(transactionId);

    });

    it("should Throws if DeleteTransactionRepository throws", async () => {

        const { deleteTransactionUseCase, deleteTransactionRepository } = makeSut();

        import.meta.jest.spyOn(deleteTransactionRepository, "execute").mockRejectedValue(new Error());

        const promise = deleteTransactionUseCase.execute(transaction.id);

        expect(promise).rejects.toThrow();

    });

});