import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(params) {

        const user = await this.getUserByIdRepository.execute(params.userId);

        if (!user) {
            return UserNotFoundError();
        }

        const transactions = await this.getTransactionsByUserIdRepository.execute(params.userId);

        return transactions;
    }
}