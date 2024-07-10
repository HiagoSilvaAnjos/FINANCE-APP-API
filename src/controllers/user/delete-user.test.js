import { faker } from "@faker-js/faker";
import { DeleteUserController } from "./delete-user.js";

describe("Delete user Controller", () => {

    class DeleteUserUseCaseStub {
        execute() {
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
        const deleteUserUseCase = new DeleteUserUseCaseStub();
        const deleteUserController = new DeleteUserController(deleteUserUseCase);

        return {
            deleteUserController,
            deleteUserUseCase,
        };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        }
    };

    it("Should return statusCode 200 if user deleted successfuly", async () => {

        // arrange
        const { deleteUserController } = makeSut();

        // act
        const result = await deleteUserController.execute(httpRequest);


        // assert
        expect(result.statusCode).toBe(200);

    });

    it("Should return statusCode 400 if userId is invalid", async () => {

        // arrange
        const { deleteUserController } = makeSut();

        // act
        const result = await deleteUserController.execute({ params: { userId: "invalid_id" } });


        // assert
        expect(result.statusCode).toBe(400);

    });

    it("Should return statusCode 404 if userId is notFound", async () => {

        // arrange
        const { deleteUserController, deleteUserUseCase } = makeSut();

        jest.spyOn(deleteUserUseCase, "execute").mockImplementationOnce(() => {
            return null;
        });

        // act
        const result = await deleteUserController.execute(httpRequest);


        // assert
        expect(result.statusCode).toBe(404);

    });

    it("Should return statusCode 500 if DeleteUserController Throws", async () => {

        // arrange
        const { deleteUserController, deleteUserUseCase } = makeSut();

        jest.spyOn(deleteUserUseCase, "execute").mockImplementationOnce(() => {
            throw new Error();
        });

        // act
        const result = await deleteUserController.execute(httpRequest);


        // assert
        expect(result.statusCode).toBe(500);

    });

});