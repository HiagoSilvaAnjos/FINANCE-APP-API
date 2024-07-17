import { UserNotFoundError } from "../../errors/user";
import { transaction } from "../../tests";
import { CreateTransactionController } from "./create-transaction";

describe("Create Trasaction Controller", () => {

    class CreateTransactionUseCaseStub {
        async execute() {
            return transaction;
        }
    }

    const makeSut = () => {

        const createTransactionUseCaseStub = new CreateTransactionUseCaseStub();
        const createTransactionController = new CreateTransactionController(createTransactionUseCaseStub);

        return {
            createTransactionController,
            createTransactionUseCaseStub
        };

    };

    const httpRequest = {
        body: {
            ...transaction,
            id: undefined
        }
    };

    it("should return statusCode 201 when creating transaction successfuly (earning)", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute(httpRequest);

        expect(result.statusCode).toBe(201);
    });

    it("should return statusCode 201 when creating transaction successfuly (expense)", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                type: "EXPENSE"
            }
        });

        expect(result.statusCode).toBe(201);
    });

    it("should return statusCode 201 when creating transaction successfuly (investment)", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                type: "INVESTMENT"
            }
        });

        expect(result.statusCode).toBe(201);
    });

    it("should return statusCode 400 when user_id is missing", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                user_id: undefined
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when name is missing", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                name: undefined
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when date is missing", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                date: undefined
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when amount is missing", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                amount: undefined
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when type is missing", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                type: undefined
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when date is invalid", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                date: "invalid_date"
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when amount is invalid", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                amount: "invalid_amount"
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("should return statusCode 400 when type provided is not EXPENSE, EARNING, INVESTMENT", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute({
            body: {
                ...httpRequest.body,
                type: "invalid_type"
            }
        });

        expect(result.statusCode).toBe(400);
    });

    it("Should return 500 if CreateTransactionController throws", async () => {

        const { createTransactionUseCaseStub, createTransactionController } = makeSut();

        jest.spyOn(createTransactionUseCaseStub, "execute").mockRejectedValueOnce(new Error());

        const result = await createTransactionController.execute(httpRequest);

        expect(result.statusCode).toBe(500);

    });

    it("Should return 400 if CreateTransactionController Throws UserNotFound", async () => {

        const { createTransactionUseCaseStub, createTransactionController } = makeSut();

        jest.spyOn(createTransactionUseCaseStub, "execute").mockRejectedValueOnce(new UserNotFoundError());

        const result = await createTransactionController.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    it("Should call CreateTransactionController with correct params", async () => {

        const { createTransactionUseCaseStub, createTransactionController } = makeSut();

        const executeSpy = jest.spyOn(createTransactionUseCaseStub, "execute");

        await createTransactionController.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });


});