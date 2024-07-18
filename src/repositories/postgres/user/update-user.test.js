import { faker } from "@faker-js/faker";
import { prisma } from "../../../../prisma/prisma.js";
import { user as fakeUser } from "../../../tests";
import { PostgresUpdateUserRepository } from "./update-user.js";
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
// import { UserNotFoundError } from '../../../errors/user.js'

describe("PostgresUpdateUserRepository", () => {
    const updateUserParams = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    it("should update user on db", async () => {
        const user = await prisma.user.create({ data: fakeUser });
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

        const result = await postgresUpdateUserRepository.execute(user.id, updateUserParams);

        expect(result).toStrictEqual(updateUserParams);
    });

    it("should call Prisma with correct params", async () => {

        const user = await prisma.user.create({ data: fakeUser });
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
        const prismaSpy = jest.spyOn(prisma.user, "update");

        await postgresUpdateUserRepository.execute(user.id, updateUserParams);

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
            data: updateUserParams,
        });
    });


});