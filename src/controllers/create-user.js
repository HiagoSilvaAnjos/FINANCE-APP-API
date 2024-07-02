import { CreateUserUseCase } from "../use-cases/create-user.js";
import { badRequest, created, serverError } from "./helpers/http.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { invalidPasswordResponse, invalidEmailResponse, checkIfPasswordIsValid, checkIfEmailIsValid } from "./helpers/user.js";

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            // Validar a requisição (campos obrigatórios e tamanho da senha e e-mail)
            const requiredFields = ["first_name", "last_name", "email", "password"];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param ${field}` });
                }
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password);

            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }

            const emailIsValid = checkIfEmailIsValid(params.email);

            if (!emailIsValid) {
                return invalidEmailResponse();
            }

            // chamar use case
            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            // retornar a resposta para o usuário (status code)
            return created(createdUser);

        } catch (error) {

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            console.log(error);
            return serverError();
        }
    }
}