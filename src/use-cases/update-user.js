import { EmailAlreadyInUseError } from "../errors/user.js";

import bcrypt from "bcrypt";

export class UpdateUserUseCase {
    constructor(postgresUpdateUserRepository, getUserByEmailRepository) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }

    async execute(userId, updateUserParams) {

        if (updateUserParams.email) {

            const userAlreadyExists = await this.getUserByEmailRepository.execute(updateUserParams.email);

            if (userAlreadyExists && userAlreadyExists.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }

        }

        const user = {
            ...updateUserParams
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
            user.password = hashedPassword;
        }

        const updateUser = this.postgresUpdateUserRepository.execute(userId, user);

        return updateUser;
    }

}