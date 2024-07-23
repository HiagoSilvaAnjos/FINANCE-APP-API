import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../../../prisma/prisma";
import { user } from "../../../tests";
import { PostgresDeleteUserRepository } from "./delete-user";
import { UserNotFoundError } from "../../../errors/user";

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
        const prismaSpy = import.meta.jest.spyOn(prisma.user, "delete");

        await postgresDeleteUserRepository.execute(user.id);

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
        });
    });

    it("should throw generic error if Prisma throws generic error", async () => {
        const postgresCreateUserRepository = new PostgresDeleteUserRepository();
        import.meta.jest.spyOn(prisma.user, "delete").mockRejectedValueOnce(new Error());

        const promise = postgresCreateUserRepository.execute(user.id);

        await expect(promise).rejects.toThrow();
    });

    it("should throw UserNotFoundError if Prisma does not find record to delete", async () => {
        const postgresCreateUserRepository = new PostgresDeleteUserRepository();
        import.meta.jest.spyOn(prisma.user, "delete").mockRejectedValueOnce(
            new PrismaClientKnownRequestError("", {
                code: "P2025",
            }),
        );

        const promise = postgresCreateUserRepository.execute(user.id);

        await expect(promise).rejects.toThrow(new UserNotFoundError(user.id));
    });

});