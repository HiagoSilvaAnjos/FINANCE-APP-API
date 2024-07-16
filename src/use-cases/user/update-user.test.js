import { faker } from "@faker-js/faker";
import { UpdateUserUseCase } from "./update-user.js";

describe("UpdateUserUseCase", () => {

    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 })
    };

    class PostgresUpdateUserRepositoryStub {
        async execute() {
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

    const makeSut = () => {

        const postgresUpdateUserRepositoryStub = new PostgresUpdateUserRepositoryStub();
        const getUserByEmailRepositoryStub = new GetUserByEmailRepositoryStub();
        const passwordHasherAdapterStub = new PasswordHasherAdapterStub();

        const updateUserUseCase = new UpdateUserUseCase(postgresUpdateUserRepositoryStub, getUserByEmailRepositoryStub, passwordHasherAdapterStub);

        return {
            updateUserUseCase, postgresUpdateUserRepositoryStub, getUserByEmailRepositoryStub, passwordHasherAdapterStub
        };

    };

    it("should update user successfully (without email and password)", async () => {

        const { updateUserUseCase } = makeSut();

        const result = await updateUserUseCase.execute(faker.string.uuid(), {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
        });

        expect(result).toBe(user);

    });

    it("should update user successfully (with email)", async () => {

        const { updateUserUseCase, getUserByEmailRepositoryStub } = makeSut();

        const getUserByEmailRepositoryStubSpy = jest.spyOn(getUserByEmailRepositoryStub, "execute");

        const email = faker.internet.email();

        const result = await updateUserUseCase.execute(faker.string.uuid(), {
            email,
        });

        expect(getUserByEmailRepositoryStubSpy).toHaveBeenCalledWith(email);
        expect(result).toBe(user);

    });

    it("should update user successfully (with password)", async () => {

        const { updateUserUseCase, passwordHasherAdapterStub } = makeSut();

        const passwordHasherAdapterStubSpy = jest.spyOn(passwordHasherAdapterStub, "criptograph");

        const password = faker.internet.password({ length: 7 });

        const result = await updateUserUseCase.execute(faker.string.uuid(), {
            password,
        });

        expect(passwordHasherAdapterStubSpy).toHaveBeenCalledWith(password);
        expect(result).toBe(user);

    });

});