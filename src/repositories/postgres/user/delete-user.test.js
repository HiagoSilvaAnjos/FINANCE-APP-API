import { prisma } from "../../../../prisma/prisma";
import { user } from "../../../tests";
import { PostgresDeleteUserRepository } from "./delete-user";

describe("PostgresDeleteUserRepository", () => {
    it("should delete a user on db", async () => {
        await prisma.user.create({
            data: user,
        });

        const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

        const result = await postgresDeleteUserRepository.execute(user.id);

        expect(result).toStrictEqual(user);
    });

    it("should call Prisma with correct params", async () => {
        await prisma.user.create({ data: user });
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
        const prismaSpy = jest.spyOn(prisma.user, "delete");

        await postgresDeleteUserRepository.execute(user.id);

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
        });
    });

});