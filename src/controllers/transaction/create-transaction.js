import validator from "validator";
import { badRequest, checkIfIdIsValid, created, invalidIdResponse, serverError } from "../helpers/index.js";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequest) {

        try {

            const params = httpRequest.body;

            const requiredFields = [
                "id",
                "user_id",
                "name",
                "data",
                "amount",
                "type"
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param ${field}` });
                }
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

            const transaction = this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            return created(transaction);

        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
