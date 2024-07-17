import { PostgresCreateUserRepository } from "./create-user";
import { user } from "../../../tests/index.js";
// import { prisma } from "../../../../prisma/prisma.js";

describe("CreateUserRepository", () => {
    it("should create a user on db", async () => {

        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const result = await postgresCreateUserRepository.execute(user);

        expect(result).toBeTruthy();
    });
});


// describe("CreateUserRepository", () => {
//     it("should create a user on db", async () => {
//         const postgresCreateUserRepository = new PostgresCreateUserRepository();

//         const result = await postgresCreateUserRepository.execute(user);

//         expect(result.id).toBe(user.id);
//         expect(result.first_name).toBe(user.first_name);
//         expect(result.last_name).toBe(user.last_name);
//         expect(result.email).toBe(user.email);
//         expect(result.password).toBe(user.password);
//     });

//     it("should call Prisma with correct params", async () => {
//         const postgresCreateUserRepository = new PostgresCreateUserRepository();
//         const prismaSpy = jest.spyOn(prisma.user, "create");

//         await postgresCreateUserRepository.execute(user);

//         expect(prismaSpy).toHaveBeenCalledWith({
//             data: user,
//         });
//     });

//     it("should throw if Prisma throws", async () => {
//         const postgresCreateUserRepository = new PostgresCreateUserRepository();
//         jest
//             .spyOn(prisma.user, "create")
//             .mockRejectedValueOnce(new Error());

//         const promise = postgresCreateUserRepository.execute(user);

//         await expect(promise).rejects.toThrow();
//     });
// });