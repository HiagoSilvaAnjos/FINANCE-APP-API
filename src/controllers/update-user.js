import validator from "validator";
import { badRequest, ok, serverError } from "./helper.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body;
            const userId = httpRequest.params.userId;

            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return badRequest({ message: "The provid id is not valid." });
            }

            const allowedFields = ["first_name", "last_name", "email", "password"];

            const someFieldsIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field)
            );

            if (someFieldsIsNotAllowed) {
                return badRequest({ message: "some provided field is not allowed" });
            }

            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length <= 5;

                if (passwordIsNotValid) {
                    return badRequest({ message: "Password must be at least 6 characters" });
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email);

                if (!emailIsValid) {
                    return badRequest({ message: "Invalid email" });
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updateUser = await updateUserUseCase.execute(userId, updateUserParams);

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