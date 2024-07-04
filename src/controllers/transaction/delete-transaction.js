import { checkIfIdIsValid, invalidIdResponse, ok, serverError } from "../helpers/index.js";

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }

    async execute(httpRequest) {

        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.transactionId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const deleteTransaction = await this.deleteTransactionUseCase.execute(httpRequest.params.transactionId);

            return ok(deleteTransaction);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
