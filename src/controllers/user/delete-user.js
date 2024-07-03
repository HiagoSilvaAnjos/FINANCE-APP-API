import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    ok,
    serverError
} from "../helpers/index.js";

export class DeleteUserController {
    constructor(deleteUserUseCase, getUserByIdUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
    }
    async execute(httpRequest) {

        try {

            const isIdValid = checkIfIdIsValid(httpRequest.params.userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const user = await this.getUserByIdUseCase.execute(httpRequest.params.userId);

            if (!user) {
                return notFound({ message: "User not found" });
            }

            const deleteUser = await this.deleteUserUseCase.execute(httpRequest.params.userId);

            return ok(deleteUser);

        } catch (error) {
            console.log(error);
            return serverError();
        }

    }
}
