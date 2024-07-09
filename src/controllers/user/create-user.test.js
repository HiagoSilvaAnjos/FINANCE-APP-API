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

}) 