import { EmailAlreadyInUseError } from "../../errors/user.js";

export class UpdateUserUseCase {
    constructor(
        postgresUpdateUserRepository,
        getUserByEmailRepository,
        passwordHasherAdapter
    ) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
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
            const hashedPassword = await this.passwordHasherAdapter.criptograph(updateUserParams.password);
            user.password = hashedPassword;
        }

        const updateUser = this.postgresUpdateUserRepository.execute(userId, user);

        return updateUser;
    }

}