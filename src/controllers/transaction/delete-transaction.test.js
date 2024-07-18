import { faker } from "@faker-js/faker";
import { DeleteTransactionController } from "./delete-transaction";
import { transaction } from "../../tests";
import { TransactionNotFoundError } from "../../errors/transaction";

describe("Delete Transaction Controller", () => {

    class DeleteTransactionUseCaseStub {
        async execute() {
            return {
                body: {
                    transaction,
                }
            };
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCaseStub = new DeleteTransactionUseCaseStub();
        const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCaseStub);

        return {
            deleteTransactionController,
            deleteTransactionUseCaseStub
        };

    };

    it("Should statusCode 200 when a Transaciton is deleted successfully", async () => {

        const { deleteTransactionController } = makeSut();

        const result = await deleteTransactionController.execute({
            params: {
                transactionId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(200);

    });

    it("Should return statusCode 400 if transactionId is invalid", async () => {

        const { deleteTransactionController } = makeSut();

        const result = await deleteTransactionController.execute({ params: { transactionId: "invalid_id" } });

        expect(result.statusCode).toBe(400);

    });

    it("Should return statusCode 404 if transactionId is notFound", async () => {

        const { deleteTransactionController, deleteTransactionUseCaseStub } = makeSut();

        jest.spyOn(deleteTransactionUseCaseStub, "execute").mockRejectedValue(new TransactionNotFoundError());

        const result = await deleteTransactionController.execute({
            params: {
                transactionId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(404);

    });

    it("Should return 500 if DeleteTransactionController throws", async () => {

        const { deleteTransactionUseCaseStub, deleteTransactionController } = makeSut();

        jest.spyOn(deleteTransactionUseCaseStub, "execute").mockRejectedValueOnce(new Error());

        const result = await deleteTransactionController.execute({
            params: {
                transactionId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(500);

    });

    it("Should call DeleteTransactionController with correct params", async () => {

        const { deleteTransactionUseCaseStub, deleteTransactionController } = makeSut();

        const executeSpy = jest.spyOn(deleteTransactionUseCaseStub, "execute");

        const transactionId = faker.string.uuid();

        await deleteTransactionController.execute({
            params: {
                transactionId
            }
        });

        expect(executeSpy).toHaveBeenCalledWith(transactionId);

    });

});