import { UserNotFoundError } from "../../errors/user.js";
import { checkIfIdIsValid, invalidIdResponse, ok, serverError } from "../helpers/index.js";

export class GetUserBalanceController {
    constructor(GetUserBalanceUseCase) {
        this.GetUserBalanceUseCase = GetUserBalanceUseCase;
    }

    async execute(httpRequest) {
        try {

            const userId = httpRequest.params.userId;

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const balance = await this.GetUserBalanceUseCase.execute({ userId });

            return ok(balance);

        } catch (error) {
            console.log(error);

            if (error instanceof UserNotFoundError) {
                return UserNotFoundError();
            }

            return serverError();
        }
    }
}