import { CreateUserController } from "./create-user.js";
import { faker } from "@faker-js/faker";

describe("Create user controller", () => {

    class CreateUserUseCase {
        execute(user) {
            return user;
        }
    }


    it("Should return status 201 when create a new user successfully", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 })
            }
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(httpRequest.body);

    });

    // Testar se o campo first_name não foi fonercido
    it("Should return status 400 if first_name is not provided", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 })
            }
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);

    });

    // Testar se o campo last_name não foi fonercido
    it("Should return status 400 if last_name is not provided", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 })
            }
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);

    });

    // Testar se o campo email não foi fonercido
    it("Should return status 400 if email is not provided", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                password: faker.internet.password({ length: 7 })
            }
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    // Testar se o campo password não foi fonercido
    it("Should return status 400 if password is not provided", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
            }
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);

    });

    // Testar se o campo email não é válido 
    it("Should return 'Please provide a valid email' if email provided is invalid", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: "invalidEmail",
                password: faker.internet.password({ length: 7 })
            }
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.body.message).toBe("Please provide a valid email");

    });

    // Testar se o campo password não é válido 
    it("Should return 'Password must be at least 6 characters' if password provided is invalid", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 5 })
            }
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.body.message).toBe("Password must be at least 6 characters");

    });

    // Testar se o useCase está sendo chamado com os valores corretos 
    it("Should call CreateUserUseCase with correct params", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 })
            }
        };

        const executeSpy = jest.spyOn(createUserUseCase, "execute");

        // act
        await createUserController.execute(httpRequest);

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);

    });

    // Testar se o UseController retorna status 500 se houver throws no UseCase
    it("Should return 500 if CreateUserUseCase throws", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase();
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 })
            }
        };

        jest.spyOn(createUserUseCase, "execute").mockImplementationOnce(() => {
            throw new Error();
        });

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(500);

    });

}); 