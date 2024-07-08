import { ZodError } from "zod";
import {
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError
} from "../../controllers/helpers/index.js";
import { updateTransactionSchema } from "../../schemas/transaction.js";

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

            console.log(error);
            serverError();
        }
    }
}