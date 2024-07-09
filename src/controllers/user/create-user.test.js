import { CreateUserController } from "./create-user.js"

describe("Create user controller", () => {

    class CreateUserUseCase {
        execute(user) {
            return user
        }
    }


    it("Should return status 201 when create a new user successfully", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCase()
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: "jhon",
                last_name: "Tester",
                email: "JhonTester@gmail.com",
                password: "123456"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(201);
        expect(result.body).toBe(httpRequest.body);

    })

    // Testar se o campo first_name não foi fonercido
    it("Should return status 400 if first_name is not provided", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase()
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                last_name: "Tester",
                email: "JhonTester@gmail.com",
                password: "123456"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)

    })

    // Testar se o campo last_name não foi fonercido
    it("Should return status 400 if last_name is not provided", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase()
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: "Jhon",
                email: "JhonTester@gmail.com",
                password: "123456"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)

    })

    // Testar se o campo email não foi fonercido
    it("Should return status 400 if email is not provided", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase()
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: "John",
                last_name: "Tester",
                password: "123456"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Testar se o campo password não foi fonercido
    it("Should return status 400 if password is not provided", async () => {

        // arrange
        const createUserUseCase = new CreateUserUseCase()
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: "John",
                last_name: "Tester",
                email: "JhonTester@gmail.com",
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)

    })

    // Testar se o campo email não é válido 
    it("Should return 'Please provide a valid email' if email provided is invalid", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCase()
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: "jhon",
                last_name: "Tester",
                email: "JhonTeste",
                password: "123456"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.body.message).toBe("Please provide a valid email");

    })

    // Testar se o campo password não é válido 
    it("Should return 'Password must be at least 6 characters' if password provided is invalid", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCase()
        const createUserController = new CreateUserController(createUserUseCase);

        const httpRequest = {
            body: {
                first_name: "jhon",
                last_name: "Tester",
                email: "JhonTester@gmail.com",
                password: "1234"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.body.message).toBe("Password must be at least 6 characters");

    })

}) 