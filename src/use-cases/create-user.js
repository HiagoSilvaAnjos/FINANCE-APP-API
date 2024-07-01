import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: Verificar se o e-mail já está em uso
        const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

        const userAlreadyExists = await getUserByEmailRepository.execute(createUserParams.email);

        if (userAlreadyExists) {
            throw new Error("The Provided email is already in use.");
        }

        // Criar ID do usuário
        const userId = uuidv4();

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // Inserir o usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword
        };


        // Chamar o repositório
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}