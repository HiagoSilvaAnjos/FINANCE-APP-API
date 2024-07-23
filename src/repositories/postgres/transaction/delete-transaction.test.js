import dayjs from "dayjs";
import { prisma } from "../../../../prisma/prisma";
import { transaction, user } from "../../../tests";
import { PostgresDeleteTransactionRepository } from "./delete-transaction";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TransactionNotFoundError } from "../../../errors/transaction";

describe("PostgresDeleteTransactionRepository", () => {
    it("should delete a transaction on db", async () => {
        await prisma.user.create({ data: user });
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        });
        const postgresDeleteTransactionRepository = new PostgresDeleteTransactionRepository();

        const result = await postgresDeleteTransactionRepository.execute(transaction.id);

        expect(result.name).toBe(transaction.name);
        expect(result.type).toBe(transaction.type);
        expect(result.user_id).toBe(user.id);
        expect(String(result.amount)).toBe(String(transaction.amount));
        expect(dayjs(result.date).daysInMonth()).toBe(
            dayjs(transaction.date).daysInMonth(),
        );
        expect(dayjs(result.date).month()).toBe(dayjs(transaction.date).month());
        expect(dayjs(result.date).year()).toBe(dayjs(transaction.date).year());
    });

    it("should call Prisma with correct params", async () => {
        await prisma.user.create({ data: user });
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        });
        const prismaSpy = import.meta.jest.spyOn(prisma.transaction, "delete");
        const postgresDeleteTransactionRepository = new PostgresDeleteTransactionRepository();

        await postgresDeleteTransactionRepository.execute(transaction.id);

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: transaction.id,
            },
        });
    });

    it("should throw generic error if Prisma throws generic error", async () => {
        const postgresDeleteTransactionRepository = new PostgresDeleteTransactionRepository();
        import.meta.jest.spyOn(prisma.transaction, "delete").mockRejectedValueOnce(new Error());

        const promise = postgresDeleteTransactionRepository.execute(transaction.id);

        await expect(promise).rejects.toThrow();
    });

    it("should throw generic error if Prisma throws generic error", async () => {
        const postgresDeleteTransactionRepository = new PostgresDeleteTransactionRepository();
        import.meta.jest.spyOn(prisma.transaction, "delete").mockRejectedValueOnce(
            new PrismaClientKnownRequestError("", {
                code: "P2025",
            }),
        );

        const promise = postgresDeleteTransactionRepository.execute(transaction.id);

        await expect(promise).rejects.toThrow(
            new TransactionNotFoundError(transaction.id),
        );
    });

});