import { faker } from "@faker-js/faker";
import { UpdateUserController } from "./update-user.js";

describe("Update user", () => {

    class UpdateUserUseCase {
        async execute(user) {
            return user;
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCase();
        const updateUserController = new UpdateUserController(updateUserUseCase);

        return {
            updateUserController,
            updateUserUseCase
        };
    };

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 })
        },
        params: {
            userId: faker.string.uuid()
        }
    };

    it("Should return statusCode 200 if user update successfuly", async () => {

        const { updateUserController } = makeSut();

        const result = await updateUserController.execute(httpRequest);

        expect(result.statusCode).toBe(200);

    });

});