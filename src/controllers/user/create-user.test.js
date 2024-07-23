import { EmailAlreadyInUseError } from "../../errors/user.js";
import { CreateUserController } from "./create-user.js";

import { user } from "../../tests/index.js";

import { faker } from "@faker-js/faker";

describe("Create user controller", () => {

    class CreateUserUseCase {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        return {
            createUserController,
            createUserUseCase
        };
    };

    const httpRequest = {
        body: {
            ...user,
            id: undefined
        }
    };

    it("Should return status 201 when create a new user successfully", async () => {
        // arrange
        const { createUserController } = makeSut();

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(user);

    });

    // Testar se o campo first_name não foi fonercido
    it("Should return status 400 if first_name is not provided", async () => {

        // arrange
        const { createUserController } = makeSut();

        // act
        const result = await createUserController.execute({
            body: {
                ...httpRequest.body,
                first_name: undefined
            }
        });

        // assert
        expect(result.statusCode).toBe(400);

    });

    // Testar se o campo last_name não foi fonercido
    it("Should return status 400 if last_name is not provided", async () => {

        // arrange
        const { createUserController } = makeSut();

        // act
        const result = await createUserController.execute({
            body: {
                ...httpRequest.body,
                last_name: undefined
            }
        });

        // assert
        expect(result.statusCode).toBe(400);

    });

    // Testar se o campo email não foi fonercido
    it("Should return status 400 if email is not provided", async () => {

        // arrange
        const { createUserController } = makeSut();

        // act
        const result = await createUserController.execute({
            body: {
                ...httpRequest.body,
                email: undefined
            }
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    // Testar se o campo password não foi fonercido
    it("Should return status 400 if password is not provided", async () => {

        // arrange
        const { createUserController } = makeSut();

        // act
        const result = await createUserController.execute({
            body: {
                ...httpRequest.body,
                password: undefined
            }
        });

        // assert
        expect(result.statusCode).toBe(400);

    });

    // Testar se o campo email não é válido 
    it("Should return 'Please provide a valid email' if email provided is invalid", async () => {
        // arrange
        const { createUserController } = makeSut();

        // act
        const result = await createUserController.execute({
            body: {
                ...httpRequest.body,
                email: "invalidEmail"
            }
        });

        // assert
        expect(result.body.message).toBe("Please provide a valid email");

    });

    // Testar se o campo password não é válido 
    it("Should return 'Password must be at least 6 characters' if password provided is invalid", async () => {
        // arrange
        const { createUserController } = makeSut();

        // act
        const result = await createUserController.execute({
            body: {
                ...httpRequest.body,
                password: faker.internet.password({ length: 5 })
            }
        });

        // assert
        expect(result.body.message).toBe("Password must be at least 6 characters");

    });

    // Testar se o useCase está sendo chamado com os valores corretos 
    it("Should call CreateUserUseCase with correct params", async () => {
        // arrange
        const { createUserUseCase, createUserController } = makeSut();

        const executeSpy = import.meta.jest.spyOn(createUserUseCase, "execute");

        // act
        await createUserController.execute(httpRequest);

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);

    });

    // Testar se o UseController retorna status 500 se houver throws no UseCase
    it("Should return 500 if CreateUserUseCase throws", async () => {

        // arrange
        const { createUserUseCase, createUserController } = makeSut();

        import.meta.jest.spyOn(createUserUseCase, "execute").mockRejectedValueOnce(new Error());

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(500);

    });

    // Testar se o UseController retorna status 400 se houver throws EmailAlreadyInUseError
    it("Should return 400 if CreateUserController Throws EmailAlreadyInUseError", async () => {

        // arrange
        const { createUserUseCase, createUserController } = makeSut();

        import.meta.jest.spyOn(createUserUseCase, "execute").mockRejectedValueOnce(new EmailAlreadyInUseError());

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

}); 