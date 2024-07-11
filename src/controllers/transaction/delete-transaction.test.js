import { faker } from "@faker-js/faker";
import { DeleteTransactionController } from "./delete-transaction";

describe("Delete Transaction Controller", () => {

    class DeleteTransactionUseCaseStub {
        async execute(transactionId) {
            return {
                body: {
                    user_id: transactionId,
                    name: faker.string.alphanumeric(10),
                    date: faker.date.anytime().toISOString(),
                    amount: Number(faker.finance.amount()),
                    type: "EARNING"
                }
            };
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCaseStun = new DeleteTransactionUseCaseStub();
        const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCaseStun);

        return {
            deleteTransactionController,
            deleteTransactionUseCaseStun
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


});