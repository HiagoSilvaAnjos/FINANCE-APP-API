import { faker } from "@faker-js/faker";
import { GetUserBalanceController } from "./get-user-balance.js";
import { UserNotFoundError } from "../../errors/user.js";

describe("Get user Balance", () => {

    class GetUserBalanceUseCaseStub {
        async execute() {
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

        const { getUserBalanceController } = makeSut();

        const result = await getUserBalanceController.execute(httpRequest);

        expect(result.statusCode).toBe(200);

    });

    it("Should return statusCode 400 if userId is invalid", async () => {

        const { getUserBalanceController } = makeSut();

        const result = await getUserBalanceController.execute({ params: { userId: "invalid_id" } });

        expect(result.statusCode).toBe(400);

    });

    it("Should return statusCode 404 if GetUserBalanceControler throws is 'UserNotFoundError'", async () => {

        const { getUserBalanceController, getUserBalanceUseCase } = makeSut();

        import.meta.jest.spyOn(getUserBalanceUseCase, "execute").mockRejectedValueOnce(new UserNotFoundError());

        const result = await getUserBalanceController.execute(httpRequest);

        expect(result.statusCode).toBe(404);

    });

    it("Should return statusCode 500 if GetUserBalanceController Throws", async () => {

        const { getUserBalanceController, getUserBalanceUseCase } = makeSut();

        import.meta.jest.spyOn(getUserBalanceUseCase, "execute").mockRejectedValueOnce(new Error());

        const result = await getUserBalanceController.execute(httpRequest);


        expect(result.statusCode).toBe(500);

    });

    it("Should call GetUserBalanceUserUseCase with correct params", async () => {

        const { getUserBalanceController, getUserBalanceUseCase } = makeSut();

        const executeSpy = import.meta.jest.spyOn(getUserBalanceUseCase, "execute");

        await getUserBalanceController.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId);

    });

});