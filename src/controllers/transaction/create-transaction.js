import validator from "validator";
import { badRequest, checkIfIdIsValid, created, invalidIdResponse, serverError, validateRequiredFields } from "../helpers/index.js";
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
                return badRequest({
                    message: `The field ${missingField} is required`,
                });
            }

            const isIdValid = checkIfIdIsValid(params.user_id);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            if (params.amount <= 0) {
                badRequest({
                    message: "amount must be greater than zero",
                });
            }

            const amountIsValid = validator.isCurrency(params.amount.toString(), {
                digits_after_decimal: [2],
                allow_decimal: false,
                decimal_separator: "."
            });

            if (!amountIsValid) {
                return badRequest({
                    message: "amount must be a valid currency"
                });
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);

            if (!typeIsValid) {
                return badRequest({
                    message: "type must be EARNING, EXPENSE or INVESTMENT"
                });
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
