import { v4 as uuidv4 } from "uuid";
import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserUseCase {
    constructor(postgresCreateUserRepository, getUserByEmailRepository, passwordHasherAdapter) {
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
    }

    async execute(createUserParams) {

        const userAlreadyExists = await this.getUserByEmailRepository.execute(createUserParams.email);

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const userId = uuidv4();

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