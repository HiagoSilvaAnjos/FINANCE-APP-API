import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserUseCase {
    constructor(postgresCreateUserRepository, getUserByEmailRepository, passwordHasherAdapter, idGeneratorAdapter) {
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
        this.idGeneratorAdapter = idGeneratorAdapter;
    }

    async execute(createUserParams) {

        const userAlreadyExists = await this.getUserByEmailRepository.execute(createUserParams.email);

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const userId = this.idGeneratorAdapter.execute();

        const hashedPassword = await this.passwordHasherAdapter.criptograph(createUserParams.password);

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword
        };

        const createdUser = await this.postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}