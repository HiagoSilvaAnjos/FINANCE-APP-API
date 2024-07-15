import { faker } from "@faker-js/faker";
import { CreateUserUseCase } from "./create-user";

describe("Create User Use Case", () => {

    class PostgresCreateUserRepositoryStub {
        async execute(user) {
            return user;
        }
    }

    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }

    class PasswordHasherAdapterStub {
        criptograph() {
            return "hashed_password";
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return "id_generate";
        }
    }

    const makeSut = () => {

        const postgresCreateUserRepository = new PostgresCreateUserRepositoryStub();

        const getUserByEmailRepository = new GetUserByEmailRepositoryStub();

        const passwordHasherAdapter = new PasswordHasherAdapterStub();

        const idGeneratorAdapter = new IdGeneratorAdapterStub();

        const createUserUseCase = new CreateUserUseCase(postgresCreateUserRepository, getUserByEmailRepository, passwordHasherAdapter, idGeneratorAdapter);

        return {
            createUserUseCase,
            postgresCreateUserRepository,
            getUserByEmailRepository,
            passwordHasherAdapter,
            idGeneratorAdapter
        };

    };

    const createUserParams = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 })
    };

    it("Should return successfully create a user", async () => {

        const { createUserUseCase } = makeSut();

        const createdUser = await createUserUseCase.execute(createUserParams);

        expect(createdUser).toBeTruthy();
    });

});