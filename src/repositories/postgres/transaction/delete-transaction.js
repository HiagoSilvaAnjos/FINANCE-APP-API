import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresDeleteTransactionRepository {
    async execute(transitionId) {

        const deleteTransaction = await PostgresHelper.query(
            `
            DELETE FROM transactions
            WHERE id = $1
            RETURNING *
            `,
            [transitionId]
        );

        return deleteTransaction[0];
    }
}