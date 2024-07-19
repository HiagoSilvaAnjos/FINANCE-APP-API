import request from "supertest";
import { app } from "../..";
import { user } from "../tests/fixtures/user.js";

describe("User Route E2E test", () => {

    it("POST /users should return 201 when user is created", async () => {

        const response = await request(app)
            .post("/api/users")
            .send({
                ...user,
                id: undefined,
            });

        expect(response.status).toBe(201);
    });

});