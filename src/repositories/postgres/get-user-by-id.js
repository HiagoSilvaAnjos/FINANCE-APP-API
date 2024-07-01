import { PostgresHelper } from "../../db/postgres/helper";

export class PostgresGetUserByIdRepository {
    async execute(userID) {
        const user = await PostgresHelper.query(
            // eslint-disable-next-line quotes
            'SELECT * FROM users WHERE id = $1',
            [userID]
        );

        return user[0];
    }
}