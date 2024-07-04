export class DeleteTransactionUseCase {
    constructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository;
    }

    async execute(transactionId) {

        const deleteUser = await this.deleteTransactionRepository.execute(transactionId);

        return deleteUser;
    }
}