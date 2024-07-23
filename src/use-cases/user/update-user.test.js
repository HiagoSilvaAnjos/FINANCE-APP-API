import { faker } from "@faker-js/faker";
import { UpdateUserUseCase } from "./update-user.js";
import { EmailAlreadyInUseError } from "../../errors/user";
import { user } from "../../tests/index.js";

describe("UpdateUserUseCase", () => {

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

        const getUserByEmailRepositoryStubSpy = import.meta.jest.spyOn(getUserByEmailRepositoryStub, "execute");

        const email = faker.internet.email();

        const result = await updateUserUseCase.execute(faker.string.uuid(), {
            email,
        });

        expect(getUserByEmailRepositoryStubSpy).toHaveBeenCalledWith(email);
        expect(result).toBe(user);

    });

    it("should update user successfully (with password)", async () => {

        const { updateUserUseCase, passwordHasherAdapterStub } = makeSut();

        const passwordHasherAdapterStubSpy = import.meta.jest.spyOn(passwordHasherAdapterStub, "criptograph");

        const password = faker.internet.password({ length: 7 });

        const result = await updateUserUseCase.execute(faker.string.uuid(), {
            password,
        });

        expect(passwordHasherAdapterStubSpy).toHaveBeenCalledWith(password);
        expect(result).toBe(user);

    });

    it("should throrw EmailAlreadyInUseError if email already in use", async () => {

        const { updateUserUseCase, getUserByEmailRepositoryStub } = makeSut();

        import.meta.jest.spyOn(getUserByEmailRepositoryStub, "execute").mockResolvedValue(user);


        const promise = updateUserUseCase.execute(faker.string.uuid(), {
            email: user.email,
        });

        await expect(promise).rejects.toThrow(new EmailAlreadyInUseError(user.email));

    });

    it("should call postgresUpdateUserRepository with correct params", async () => {

        const { updateUserUseCase, postgresUpdateUserRepositoryStub } = makeSut();

        const executeSpy = import.meta.jest.spyOn(postgresUpdateUserRepositoryStub, "execute");

        const updateUserParams = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: "hashed_password"
        };

        await updateUserUseCase.execute(user.id, updateUserParams);

        expect(executeSpy).toHaveBeenCalledWith(user.id, updateUserParams);

    });

    it("should Throws if getUserByIdRepository Throws", () => {

        const { updateUserUseCase, getUserByEmailRepositoryStub } = makeSut();

        import.meta.jest.spyOn(getUserByEmailRepositoryStub, "execute").mockRejectedValue(new Error());

        const promise = updateUserUseCase.execute(user.id, { email: user.email });

        expect(promise).rejects.toThrow();
    });

    it("should Throws if passwordHasherAdapter Throws", () => {

        const { updateUserUseCase, passwordHasherAdapterStub } = makeSut();

        import.meta.jest.spyOn(passwordHasherAdapterStub, "criptograph").mockRejectedValue(new Error());

        const promise = updateUserUseCase.execute(user.id, { password: user.password });

        expect(promise).rejects.toThrow();
    });

    it("should Throws if UpdateUserRepository Throws", () => {

        const { updateUserUseCase, postgresUpdateUserRepositoryStub } = makeSut();

        import.meta.jest.spyOn(postgresUpdateUserRepositoryStub, "execute").mockRejectedValue(new Error());

        const promise = updateUserUseCase.execute(user.id, {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 })
        });

        expect(promise).rejects.toThrow();
    });

});