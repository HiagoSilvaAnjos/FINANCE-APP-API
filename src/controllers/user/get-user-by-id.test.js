import { faker } from "@faker-js/faker";
import { GetUserByIdController } from "./get-user-by-id";

describe("Get user by id", () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return {
                body: {
                    id: faker.string.uuid(),
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    email: faker.internet.email(),
                    password: faker.internet.password({ length: 7 })
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

    it("should return statusCode 200 if a user is found", async () => {

        // arrange
        const { getUserByIdController } = makeSut();

        // act
        const result = await getUserByIdController.execute({ params: { userId: faker.string.uuid() } });

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

        jest.spyOn(getUserByIdUseCaseStub, "execute").mockResolvedValue(null);

        // act
        const result = await getUserByIdController.execute({ params: { userId: faker.string.uuid() } });

        // assert
        expect(result.statusCode).toBe(404);

    });

    it("Should return statusCode 500 if getUserByIdController Throws", async () => {

        // arrange
        const { getUserByIdController, getUserByIdUseCaseStub } = makeSut();

        jest.spyOn(getUserByIdUseCaseStub, "execute").mockRejectedValueOnce(new Error());

        // act
        const result = await getUserByIdController.execute({ params: { userId: faker.string.uuid() } });

        // assert
        expect(result.statusCode).toBe(500);

    });

});