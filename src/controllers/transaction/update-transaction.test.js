import { faker } from "@faker-js/faker";
import { UpdateTransactionController } from "./update-transaction";
import { transaction } from "../../tests";

describe("Update Transaction Controller", () => {

    class UpdateTransactionUseCaseStub {
        async execute() {
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

    it("Should return statusCode 400 if transactionId provided is invalid", async () => {

        const { updateTransactionController } = makeSut();

        const result = await updateTransactionController.execute({
            body: {
                ...httpRequest.body
            },
            params: {
                transactionId: "invalid_id"
            }
        });

        expect(result.statusCode).toBe(400);

    });

    it("should return statusCode 400 when date is invalid", async () => {

        const { updateTransactionController } = makeSut();

        const result = await updateTransactionController.execute({
            body: {
                ...httpRequest.body,
                date: "invalid_date"
            },
            params: {
                transactionId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when amount is invalid", async () => {

        const { updateTransactionController } = makeSut();

        const result = await updateTransactionController.execute({
            body: {
                ...httpRequest.body,
                amount: "invalid_date"
            },
            params: {
                transactionId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(400);
    });


    it("should return statusCode 400 when type provided is not EXPENSE, EARNING, INVESTMENT", async () => {

        const { updateTransactionController } = makeSut();

        const result = await updateTransactionController.execute({
            body: {
                ...httpRequest.body,
                type: "invalid_type"
            },
            params: {
                transactionId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when unalloweds fields is provided", async () => {

        const { updateTransactionController } = makeSut();

        const result = await updateTransactionController.execute({
            body: {
                ...httpRequest.body,
                invalid_field: "invalid_value"
            },
            params: {
                transactionId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("Should return 500 if UpdateTransactionController throws", async () => {

        const { updateTransactionController, updateTransactionUseCase } = makeSut();

        import.meta.jest.spyOn(updateTransactionUseCase, "execute").mockRejectedValueOnce(new Error());

        const result = await updateTransactionController.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    it("Should call CreateUserUseCase with correct params", async () => {
        const { updateTransactionUseCase, updateTransactionController } = makeSut();

        const executeSpy = import.meta.jest.spyOn(updateTransactionUseCase, "execute");

        await updateTransactionController.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.transactionId, httpRequest.body);

    });

});