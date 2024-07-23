import { faker } from "@faker-js/faker";
import { GetUserByIdController } from "./get-user-by-id";
import { user } from "../../tests";

describe("Get user by id", () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return {
                body: {
                    user
                }
            };
        }
    }


    const makeSut = () => {
        const getUserByIdUseCaseStub = new GetUserByIdUseCaseStub();
        const getUserByIdController = new GetUserByIdController(getUserByIdUseCaseStub);

        return {
            getUserByIdController,
            getUserByIdUseCaseStub,
        };
    };

    const httpRequest = {
        params: { userId: faker.string.uuid() }
    };

    it("should return statusCode 200 if a user is found", async () => {

        // arrange
        const { getUserByIdController } = makeSut();

        // act
        const result = await getUserByIdController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(200);

    });

    it("Should return statusCode 400 if userId is invalid", async () => {

        // arrange
        const { getUserByIdController } = makeSut();

        // act
        const result = await getUserByIdController.execute({ params: { userId: "invalid_id" } });

        // assert
        expect(result.statusCode).toBe(400);

    });

    it("Should return statusCode 404 if user notFound", async () => {

        // arrange
        const { getUserByIdController, getUserByIdUseCaseStub } = makeSut();

        import.meta.jest.spyOn(getUserByIdUseCaseStub, "execute").mockResolvedValue(null);

        // act
        const result = await getUserByIdController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(404);

    });

    it("Should return statusCode 500 if getUserByIdController Throws", async () => {

        // arrange
        const { getUserByIdController, getUserByIdUseCaseStub } = makeSut();

        import.meta.jest.spyOn(getUserByIdUseCaseStub, "execute").mockRejectedValueOnce(new Error());

        // act
        const result = await getUserByIdController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(500);

    });

    it("Should call GetUserByIdUseCase with correct params", async () => {

        const { getUserByIdController, getUserByIdUseCaseStub } = makeSut();

        const executeSpy = import.meta.jest.spyOn(getUserByIdUseCaseStub, "execute");

        await getUserByIdController.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId);

    });

});