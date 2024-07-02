import { EmailAlreadyInUseError } from "../errors/user.js";

import {
    invalidPasswordResponse,
    invalidEmailResponse,
    invalidIdResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    checkIfIdIsValid,
    badRequest,
    ok,
    serverError
} from "./helpers/index.js";

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const userId = httpRequest.params.userId;

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const allowedFields = ["first_name", "last_name", "email", "password"];

            const someFieldsIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field)
            );

            if (someFieldsIsNotAllowed) {
                return badRequest({ message: "some provided field is not allowed" });
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password);

                if (!passwordIsValid) {
                    return invalidPasswordResponse();
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email);

                if (!emailIsValid) {
                    return invalidEmailResponse();
                }
            }

            const updateUser = await this.updateUserUseCase.execute(userId, params);

            console.log(updateUser);
            return ok(updateUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            console.log(error);
            return serverError();
        }
    }
}