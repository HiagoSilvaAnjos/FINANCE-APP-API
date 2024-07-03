import { UserNotFoundError } from "../../errors/user";
import { v4 as uuidv4 } from "uuid";


export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.postgresCreateTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(createTransactionParams) {

        const userId = createTransactionParams.userId;

        const user = this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const transactionId = uuidv4();

        const transaction = this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId
        });

        return transaction;
    }
}