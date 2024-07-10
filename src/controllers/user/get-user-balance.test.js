import { faker } from "@faker-js/faker";
import { GetUserBalanceController } from "./get-user-balance";

describe("Get user Balance", () => {

    class GetUserBalanceUseCaseStub {
        execute() {
            return faker.finance.amount();
        }
    }

    const makeSut = () => {
        const getUserBalanceUseCase = new GetUserBalanceUseCaseStub();
        const getUserBalanceController = new GetUserBalanceController(getUserBalanceUseCase);

        return {
            getUserBalanceUseCase,
            getUserBalanceController
        };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        }
    };

    it("Should return statusCode 200 when getUserBalanceController getting user balance", async () => {

        // arrange
        const { getUserBalanceController } = makeSut();

        // act
        const result = await getUserBalanceController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(200);

    });

    it("Should return statusCode 400 if userId is invalid", async () => {

        // arrange
        const { getUserBalanceController } = makeSut();

        // act
        const result = await getUserBalanceController.execute({ params: { userId: "invalid_id" } });


        // assert
        expect(result.statusCode).toBe(400);

    });


});