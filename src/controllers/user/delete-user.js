import { UserNotFoundError } from "../../errors/user.js";
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

            return ok(deleteUser);

        } catch (error) {

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            console.log(error);
            return serverError();
        }

    }
}
