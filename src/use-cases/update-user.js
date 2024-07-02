import { EmailAlreadyInUseError } from "../errors/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import bcrypt from "bcrypt";
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user.js";

export class UpdateUserUseCase {

    async execute(userId, updateUserParams) {

        if (updateUserParams.email) {

            const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

            const userAlreadyExists = await getUserByEmailRepository.execute(updateUserParams.email);

            if (userAlreadyExists) {
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


        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

        const updateUser = postgresUpdateUserRepository.execute(userId, user);

        return updateUser;
    }

}