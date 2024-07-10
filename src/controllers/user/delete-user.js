import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse
} from "../helpers/index.js";

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async execute(httpRequest) {

        try {

            const isIdValid = checkIfIdIsValid(httpRequest.params.userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const deleteUser = await this.deleteUserUseCase.execute(httpRequest.params.userId);

            if (!deleteUser) {
                return userNotFoundResponse();
            }

            return ok(deleteUser);

        } catch (error) {
            console.log(error);
            return serverError();
        }

    }
}
