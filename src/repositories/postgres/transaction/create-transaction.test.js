import { PostgresCreateTransactionRepository } from "./create-transaction";
import { transaction, user } from "../../../tests";
import { prisma } from "../../../../prisma/prisma";
import dayjs from "dayjs";

describe("PostgresCreateTransactionRepository", () => {
    it("should create a transaction on db", async () => {
        await prisma.user.create({ data: user });
        const postgresCreateTransactionRepository = new PostgresCreateTransactionRepository();

        const result = await postgresCreateTransactionRepository.execute({ ...transaction, user_id: user.id });

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
        const postgresCreateTransactionRepository = new PostgresCreateTransactionRepository();
        const prismaSpy = import.meta.jest.spyOn(prisma.transaction, "create");

        await postgresCreateTransactionRepository.execute({ ...transaction, user_id: user.id });

        expect(prismaSpy).toHaveBeenCalledWith({
            data: {
                ...transaction,
                user_id: user.id,
            },
        });
    });

    it("should throw if Prisma throws", async () => {
        const postgresCreateTransactionRepository = new PostgresCreateTransactionRepository();
        import.meta.jest.spyOn(prisma.transaction, "create").mockRejectedValueOnce(new Error());

        const promise = postgresCreateTransactionRepository.execute(transaction);

        await expect(promise).rejects.toThrow();
    });


});