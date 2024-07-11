import { faker } from "@faker-js/faker";
import { UpdateTransactionController } from "./update-transaction";

describe("Update Transaction Controller", () => {

    class UpdateTransactionUseCaseStub {
        async execute(transaction) {
            return transaction;
        }
    }

    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub();
        const updateTransactionController = new UpdateTransactionController(updateTransactionUseCase);

        return {
            updateTransactionController,
            updateTransactionUseCase
        };
    };

    const httpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.string.alphanumeric(10),
            date: faker.date.anytime().toISOString(),
            amount: Number(faker.finance.amount()),
            type: "EARNING"
        },
        params: {
            transactionId: faker.string.uuid()
        }
    };

    it("Should return statusCode 200 when transaction is updated", async () => {

        const { updateTransactionController } = makeSut();

        const result = await updateTransactionController.execute(httpRequest);

        expect(result.statusCode).toBe(200);

    });

});