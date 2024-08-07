import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { TransactionType } from "@prisma/client";
import { prisma } from "../../../../prisma/prisma";
import { transaction, user } from "../../../tests";
import { PostgresUpdateTransactionRepository } from "./update-transaction";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { TransactionNotFoundError } from "../../../errors/transaction";

describe("PostgresUpdateTransactionRepository", () => {
    it("should update a transaction on db", async () => {
        await prisma.user.create({ data: user });
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        });
        const postgresUpdateTransactionRepository = new PostgresUpdateTransactionRepository();
        const params = {
            id: faker.string.uuid(),
            user_id: user.id,
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: TransactionType.EXPENSE,
            amount: Number(faker.finance.amount()),
        };

        const result = await postgresUpdateTransactionRepository.execute(transaction.id, params);

        expect(result.name).toBe(params.name);
        expect(result.type).toBe(params.type);
        expect(result.user_id).toBe(user.id);
        expect(String(result.amount)).toBe(String(params.amount));
        expect(dayjs(result.date).daysInMonth()).toBe(
            dayjs(params.date).daysInMonth(),
        );
        expect(dayjs(result.date).month()).toBe(dayjs(params.date).month());
        expect(dayjs(result.date).year()).toBe(dayjs(params.date).year());
    });

    it("should call Prisma with correct params", async () => {
        await prisma.user.create({ data: user });
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        });
        const postgresUpdateTransactionRepository = new PostgresUpdateTransactionRepository();
        const prismaSpy = import.meta.jest.spyOn(prisma.transaction, "update");

        await postgresUpdateTransactionRepository.execute(transaction.id, { ...transaction, user_id: user.id });

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: transaction.id,
            },
            data: { ...transaction, user_id: user.id },
        });
    });

    it("should throw if Prisma throws", async () => {
        const postgresUpdateTransactionRepository = new PostgresUpdateTransactionRepository();
        import.meta.jest.spyOn(prisma.transaction, "update").mockRejectedValueOnce(new Error());

        const promise = postgresUpdateTransactionRepository.execute(transaction.id, transaction);

        await expect(promise).rejects.toThrow();
    });

    it("should throw TransactionNotFoundError if Prisma does not find record to update", async () => {
        const postgresUpdateTransactionRepository = new PostgresUpdateTransactionRepository();
        import.meta.jest.spyOn(prisma.transaction, "update").mockRejectedValueOnce(
            new PrismaClientKnownRequestError("", {
                code: "P2025",
            }),
        );

        const promise = postgresUpdateTransactionRepository.execute(transaction.id, transaction);

        await expect(promise).rejects.toThrow(
            new TransactionNotFoundError(transaction.id),
        );
    });

});