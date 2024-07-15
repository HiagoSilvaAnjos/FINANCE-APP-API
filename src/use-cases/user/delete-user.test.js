import { faker } from "@faker-js/faker";

import { DeleteUserUseCase } from "./delete-user.js";

describe("Delete User Use Case", () => {

    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 })
    };

    class DeleteUserRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {

        const deleteUserRepository = new DeleteUserRepositoryStub();

        const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

        return {
            deleteUserUseCase,
            deleteUserRepository
        };

    };

    it("should delete a user successfully", async () => {

        const { deleteUserUseCase } = makeSut();

        const deleteUser = await deleteUserUseCase.execute(user.id);

        expect(deleteUser).toEqual(user);

    });

    it("should call DeleteUserRepository with corrects params", async () => {

        const { deleteUserUseCase, deleteUserRepository } = makeSut();

        const executeSpy = jest.spyOn(deleteUserRepository, "execute");
        const userId = faker.string.uuid();

        await deleteUserUseCase.execute(userId);

        expect(executeSpy).toHaveBeenCalledWith(userId);
    });

});