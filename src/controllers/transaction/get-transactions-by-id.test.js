import { faker } from "@faker-js/faker";
import { GetTransactionsByUserIdController } from "./get-transactions-by-id";
import { UserNotFoundError } from "../../errors/user";
import { transaction } from "../../tests";

describe("Get Transaction By User Id Controller", () => {

    class GetTransactionsByUserIdUserCaseStub {
        async execute() {
            return [
                {
                    transaction
                },
            ];
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdUserCase = new GetTransactionsByUserIdUserCaseStub();
        const getTransactionsByUserIdController = new GetTransactionsByUserIdController(getTransactionsByUserIdUserCase);

        return {
            getTransactionsByUserIdController,
            getTransactionsByUserIdUserCase
        };

    };

    it("Should return statusCode 200 when getting transactions successfuly", async () => {

        const { getTransactionsByUserIdController } = makeSut();

        const result = await getTransactionsByUserIdController.execute({
            query: {
                userId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(200);

    });

    it("Should return statusCode 400 when userId provided is invalid", async () => {

        const { getTransactionsByUserIdController } = makeSut();

        const result = await getTransactionsByUserIdController.execute({
            query: {
                userId: undefined
            }
        });

        expect(result.statusCode).toBe(400);

    });

    it("Should return statusCode 400 if userId is invalid", async () => {

        const { getTransactionsByUserIdController } = makeSut();

        const result = await getTransactionsByUserIdController.execute({
            query: {
                userId: "invalid_id"
            }
        });

        expect(result.statusCode).toBe(400);

    });

    it("Should return statusCode 404 if userId provided is notFound", async () => {

        const { getTransactionsByUserIdController, getTransactionsByUserIdUserCase } = makeSut();

        import.meta.jest.spyOn(getTransactionsByUserIdUserCase, "execute").mockRejectedValueOnce(new UserNotFoundError());

        const result = await getTransactionsByUserIdController.execute({
            query: {
                userId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(404);

    });

    it("Should return 500 if GetTransactionsByUserIdController throws generics", async () => {

        const { getTransactionsByUserIdController, getTransactionsByUserIdUserCase } = makeSut();

        import.meta.jest.spyOn(getTransactionsByUserIdUserCase, "execute").mockRejectedValueOnce(new Error());

        const result = await getTransactionsByUserIdController.execute({
            query: {
                userId: faker.string.uuid()
            }
        });

        expect(result.statusCode).toBe(500);

    });

    it("Should call GetTransactionsByUserIdController with correct params", async () => {

        const { getTransactionsByUserIdController, getTransactionsByUserIdUserCase } = makeSut();

        const executeSpy = import.meta.jest.spyOn(getTransactionsByUserIdUserCase, "execute");

        const userId = faker.string.uuid();

        await getTransactionsByUserIdController.execute({
            query: {
                userId,
            }
        });

        expect(executeSpy).toHaveBeenCalledWith(userId);

    });

});