import { prisma } from "../../../../prisma/prisma.js";
import { user as fakeUser } from "../../../tests";
import { PostgresGetUserByIdRepository } from "./get-user-by-id";

describe("PostgresGetUserByIdRepository", () => {
    it("should get user by id on db", async () => {
        const user = await prisma.user.create({ data: fakeUser });

        const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

        const result = await postgresGetUserByIdRepository.execute(user.id);

        expect(result).toStrictEqual(user);
    });
});