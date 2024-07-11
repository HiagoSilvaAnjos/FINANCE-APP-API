import { faker } from "@faker-js/faker";
import { GetTransactionsByUserIdController } from "./get-transactions-by-id";

describe("Get Transaction By User Id Controller", () => {

    class GetTransactionsByUserIdUserCaseStub {
        async execute(params) {
            return [
                {
                    user_id: params.userId,
                    id: faker.string.uuid(),
                    name: faker.string.alphanumeric(10),
                    date: faker.date.anytime().toISOString(),
                    amount: Number(faker.finance.amount()),
                    type: "EARNING"
                },
                {
                    user_id: params.userId,
                    id: faker.string.uuid(),
                    name: faker.string.alphanumeric(10),
                    date: faker.date.anytime().toISOString(),
                    amount: Number(faker.finance.amount()),
                    type: "EXPENSE"
                },
                {
                    user_id: params.userId,
                    id: faker.string.uuid(),
                    name: faker.string.alphanumeric(10),
                    date: faker.date.anytime().toISOString(),
                    amount: Number(faker.finance.amount()),
                    type: "INVESTMENT"
                }
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

});