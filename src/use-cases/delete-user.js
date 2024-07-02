import { DeleteUserRepository } from "../repositories/postgres/delete-user.js";

export class DeleteUserUseCase {
    async execute(userId) {

        const deleteUserRepository = new DeleteUserRepository();

        const deleteUser = await deleteUserRepository.execute(userId);

        return deleteUser;
    }
}