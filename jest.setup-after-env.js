import { prisma } from "./prisma/prisma";

beforeEach(async () => {
    prisma.user.deleteMany({});
    prisma.transaction.deleteMany({});
});