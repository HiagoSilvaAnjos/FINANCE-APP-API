import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    ok,
    serverError
} from "../../controllers/helpers/index.js";

export class updateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }

    async execute(httpRequest) {
        try {

            const params = httpRequest.body;

            const idIsValid = checkIfIdIsValid(httpRequest.params.transactionId);

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const allowedFields = ["name", "date", "amount", "type"];

            const someFieldsIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field)
            );

            if (someFieldsIsNotAllowed) {
                return badRequest({ message: "some provided field is not allowed" });
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount);

                if (!amountIsValid) {
                    return invalidAmountResponse();
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type);

                if (!typeIsValid) {
                    return invalidTypeResponse();
                }
            }

            const transaction = await this.updateTransactionUseCase.execute(httpRequest.params.transactionId, params);

            return ok(transaction);
        } catch (error) {
            console.log(error);
            serverError();
        }
    }
}