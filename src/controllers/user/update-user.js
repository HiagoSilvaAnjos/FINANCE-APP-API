import { ZodError } from "zod";
import { EmailAlreadyInUseError, UserNotFoundError } from "../../errors/user.js";
import { updateUserSchema } from "../../schemas/user.js";

import {
    invalidIdResponse,
    checkIfIdIsValid,
    badRequest,
    ok,
    serverError,
    userNotFoundResponse
} from "../helpers/index.js";

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

            await updateUserSchema.parseAsync(params);

            const updateUser = await this.updateUserUseCase.execute(userId, params);

            console.log(updateUser);
            return ok(updateUser);
        } catch (error) {

            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            console.log(error);
            return serverError();
        }
    }
}