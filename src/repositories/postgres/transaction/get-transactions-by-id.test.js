import dayjs from "dayjs";
import { prisma } from "../../../../prisma/prisma";
import { user, transaction } from "../../../tests";
import { PostgresGetTransactionsByUserIdRepository } from "./get-transactions-by-id";

describe("PostgresGetTransactionsByUserIdRepository", () => {
    it("should get transactions by user id on db", async () => {
        const postgresGetTransactionsByUserIdRepository = new PostgresGetTransactionsByUserIdRepository();
        await prisma.user.create({ data: user });
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        });

        const result = await postgresGetTransactionsByUserIdRepository.execute(user.id);

        expect(result.length).toBe(1);
        expect(result[0].name).toBe(transaction.name);
        expect(result[0].type).toBe(transaction.type);
        expect(result[0].user_id).toBe(user.id);
        expect(String(result[0].amount)).toBe(String(transaction.amount));
        expect(dayjs(result[0].date).daysInMonth()).toBe(
            dayjs(transaction.date).daysInMonth(),
        );
        expect(dayjs(result[0].date).month()).toBe(
            dayjs(transaction.date).month(),
        );
        expect(dayjs(result[0].date).year()).toBe(
            dayjs(transaction.date).year(),
        );
    });


    it("should call Prisma with correct params", async () => {
        const postgresGetTransactionsByUserIdRepository = new PostgresGetTransactionsByUserIdRepository();
        const prismaSpy = import.meta.jest.spyOn(prisma.transaction, "findMany");

        await postgresGetTransactionsByUserIdRepository.execute(user.id);

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: user.id,
            },
        });
    });

    it("should throw if Prisma throws", async () => {
        const postgresGetTransactionsByUserIdRepository = new PostgresGetTransactionsByUserIdRepository();
        import.meta.jest.spyOn(prisma.transaction, "findMany").mockRejectedValueOnce(new Error());

        const promise = postgresGetTransactionsByUserIdRepository.execute(user.id);

        await expect(promise).rejects.toThrow();
    });

});