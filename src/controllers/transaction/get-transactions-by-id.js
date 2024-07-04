import { UserNotFoundError } from "../../errors/user";
import { checkIfIdIsValid, invalidIdResponse, ok, requiredFieldsIsMissingResponse, serverError } from "../helpers/index.js";

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUserCase) {
        this.getTransactionsByUserIdUserCase = getTransactionsByUserIdUserCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;

            if (!userId) {
                return requiredFieldsIsMissingResponse(userId);
            }

            const userIdIsValid = checkIfIdIsValid(userId);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const transactions = await this.getTransactionsByUserIdUserCase({
                userId,
            });

            return ok(transactions);

        } catch (error) {
            console.log(error);

            if (error instanceof UserNotFoundError) {
                return UserNotFoundError();
            }

            return serverError();
        }
    }
}