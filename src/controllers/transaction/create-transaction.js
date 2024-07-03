import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    created,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    requiredFieldsIsMissingResponse,
    serverError,
    validateRequiredFields
} from "../helpers/index.js";
import { UserNotFoundError } from "../../errors/user.js";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequest) {

        try {

            const params = httpRequest.body;

            const requiredFields = [
                "user_id",
                "name",
                "date",
                "amount",
                "type"
            ];

            const { ok: requiredFieldsWereProvided, missingField } = validateRequiredFields(params, requiredFields);

            if (!requiredFieldsWereProvided) {
                return requiredFieldsIsMissingResponse(missingField);
            }

            const isIdValid = checkIfIdIsValid(params.user_id);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const amountIsValid = checkIfAmountIsValid(params.amount);

            if (!amountIsValid) {
                return invalidAmountResponse();
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = checkIfTypeIsValid(params.type);

            if (!typeIsValid) {
                return invalidTypeResponse();
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            console.log(transaction);
            return created(transaction);

        } catch (error) {

            if (error instanceof UserNotFoundError) {
                return badRequest({ message: error.message });
            }

            console.log(error);
            return serverError();
        }
    }
}
