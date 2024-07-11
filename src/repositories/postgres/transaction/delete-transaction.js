import { prisma } from "../../../../prisma/prisma.js";

export class PostgresDeleteTransactionRepository {
    async execute(transitionId) {
        try {
            return await prisma.transaction.delete({
                where: {
                    id: transitionId
                }
            });
        } catch (error) {
            console.log(error);
            return false;

        }
    }
}