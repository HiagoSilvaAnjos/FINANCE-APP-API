import { UserNotFoundError } from "../../errors/user";
import { CreateTransactionController } from "./create-transaction";
import { faker } from "@faker-js/faker";

describe("Create Trasaction Controller", () => {

    class CreateTransactionUseCaseStub {
        async execute(transaction) {
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
            user_id: faker.string.uuid(),
            name: faker.string.alphanumeric(10),
            date: faker.date.anytime().toISOString(),
            amount: Number(faker.finance.amount()),
            type: "EARNING"
        }
    };

    it("should return statusCode 201 when creating transaction successfuly", async () => {

        const { createTransactionController } = makeSut();

        const result = await createTransactionController.execute(httpRequest);

        expect(result.statusCode).toBe(201);
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


});