import { prisma } from "../../../../prisma/prisma.js";

export class PostgresDeleteTransactionRepository {
    async execute(transitionId) {
        return await prisma.transaction.delete({
            where: {
                id: transitionId
            }
        });
    }
}