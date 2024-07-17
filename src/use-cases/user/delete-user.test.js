import { faker } from "@faker-js/faker";

import { DeleteUserUseCase } from "./delete-user.js";
import { user } from "../../tests/index.js";

describe("Delete User Use Case", () => {
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

    it("should Throws if DeleteUserRepository Throws", () => {

        const { deleteUserUseCase, deleteUserRepository } = makeSut();

        jest.spyOn(deleteUserRepository, "execute").mockRejectedValue(new Error());

        const promise = deleteUserUseCase.execute(faker.string.uuid());

        expect(promise).rejects.toThrow();
    });

});