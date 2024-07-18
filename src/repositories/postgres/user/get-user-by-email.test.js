import { prisma } from "../../../../prisma/prisma";
import { PostgresGetUserByEmailRepository } from "./get-user-by-email";
import { user as fakeUser } from "../../../tests";

describe("GetUserByEmailRepository", () => {
    it("should get user by email on db", async () => {
        const user = await prisma.user.create({ data: fakeUser });

        const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();

        const result = await postgresGetUserByEmailRepository.execute(user.email);

        expect(result).toStrictEqual(user);

    });

    it("should call Prisma with correct params", async () => {
        const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();

        const prismaSpy = jest.spyOn(prisma.user, "findUnique");

        await postgresGetUserByEmailRepository.execute(fakeUser.email);

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                email: fakeUser.email,
            },
        });
    });

});