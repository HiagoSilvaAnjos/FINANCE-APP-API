import { faker } from "@faker-js/faker";
import { UpdateUserController } from "./update-user.js";
import { EmailAlreadyInUseError, UserNotFoundError } from "../../errors/user";
import { user } from "../../tests/index.js";

describe("Update user", () => {

    class UpdateUserUseCase {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCase();
        const updateUserController = new UpdateUserController(updateUserUseCase);

        return {
            updateUserController,
            updateUserUseCase
        };
    };

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 })
        },
        params: {
            userId: faker.string.uuid()
        }
    };

    it("Should return statusCode 200 if user update successfuly", async () => {

        const { updateUserController } = makeSut();

        const result = await updateUserController.execute(httpRequest);

        expect(result.statusCode).toBe(200);

    });

    it("Should return statusCode 400 if userId is invalid", async () => {

        const { updateUserController } = makeSut();

        const result = await updateUserController.execute({
            body: {
                ...httpRequest.body
            },
            params: {
                userId: "invalid_id"
            }
        });

        expect(result.statusCode).toBe(400);

    });

    it("Should return statusCode 400 when unallowed field is provided", async () => {

        const { updateUserController } = makeSut();

        const result = await updateUserController.execute({
            body: {
                ...httpRequest.body,
                unallowed_field: "unallowed_value"
            },
            params: {
                ...httpRequest.params
            }
        });

        expect(result.statusCode).toBe(400);

    });

    it("Should return status 400 if email provided is invalid", async () => {

        const { updateUserController } = makeSut();

        const result = await updateUserController.execute({
            body: {
                email: "invalid_email"
            },
            params: { ...httpRequest.params }
        });

        expect(result.statusCode).toBe(400);
    });

    it("Should return status 400 if password provided is invalid", async () => {

        const { updateUserController } = makeSut();

        const result = await updateUserController.execute({
            body: {
                password: faker.internet.password({ length: 5 })
            },
            params: { ...httpRequest.params }
        });

        expect(result.statusCode).toBe(400);
    });

    it("Should return 500 if updateUserController throws", async () => {

        const { updateUserUseCase, updateUserController } = makeSut();

        import.meta.jest.spyOn(updateUserUseCase, "execute").mockRejectedValueOnce(new Error());

        const result = await updateUserController.execute(httpRequest);

        expect(result.statusCode).toBe(500);

    });

    it("Should return 400 if updateUserController Throws EmailAlreadyInUseError", async () => {

        const { updateUserUseCase, updateUserController } = makeSut();

        import.meta.jest.spyOn(updateUserUseCase, "execute").mockRejectedValueOnce(new EmailAlreadyInUseError());

        const result = await updateUserController.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    it("Should return 404 if updateUserController Throws UserNotFoundError", async () => {

        const { updateUserUseCase, updateUserController } = makeSut();

        import.meta.jest.spyOn(updateUserUseCase, "execute").mockRejectedValueOnce(new UserNotFoundError());

        const result = await updateUserController.execute(httpRequest);

        expect(result.statusCode).toBe(404);
    });

    it("Should call updateUserUseCase with correct params", async () => {

        const { updateUserUseCase, updateUserController } = makeSut();

        const executeSpy = import.meta.jest.spyOn(updateUserUseCase, "execute");

        await updateUserController.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId, httpRequest.body);
    });


});