import { ZodError } from "zod";
import {
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    transactionNotFoundResponse
} from "../../controllers/helpers/index.js";
import { updateTransactionSchema } from "../../schemas/transaction.js";
import { TransactionNotFoundError } from "../../errors/transaction.js";

export class UpdateTransactionController {
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

            await updateTransactionSchema.parseAsync(params);

            const transaction = await this.updateTransactionUseCase.execute(httpRequest.params.transactionId, params);

            return ok(transaction);
        } catch (error) {

            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }

            if (error instanceof TransactionNotFoundError) {
                return transactionNotFoundResponse();
            }

            console.log(error);
            return serverError();
        }
    }
}