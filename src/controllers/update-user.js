import { badRequest, ok, serverError } from "./helpers/http.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { invalidPasswordResponse, invalidEmailResponse, invalidIdResponse, checkIfPasswordIsValid, checkIfEmailIsValid, checkIfIdIsValid } from "./helpers/user.js";

export class UpdateUserController {
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

            const updateUserUseCase = new UpdateUserUseCase();

            const updateUser = await updateUserUseCase.execute(userId, params);

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