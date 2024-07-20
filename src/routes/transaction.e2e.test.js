import request from "supertest";
import { app } from "../app.js";
import { user, transaction } from "../tests/index.js";

describe("Transaction Router 2E2 test", () => {

    it("POST /api/transactions should return 201 when creating a transaction successfully", async () => {
        const { body: createdUser } = await request(app)
            .post("/api/users")
            .send({
                ...user,
                id: undefined,
            });

        const response = await request(app)
            .post("/api/transactions")
            .send({ ...transaction, user_id: createdUser.id, id: undefined });

        expect(response.status).toBe(201);
        expect(response.body.user_id).toBe(createdUser.id);
        expect(response.body.type).toBe(transaction.type);
        expect(response.body.amount).toBe(String(transaction.amount));
    });

});