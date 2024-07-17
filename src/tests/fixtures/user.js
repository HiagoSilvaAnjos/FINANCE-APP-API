import { faker } from "@faker-js/faker";

export const user = {
    id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 7 })
};

export const userBalance = {
    userId: faker.string.uuid(),
    earnings: "2000",
    expenses: "1000",
    investments: "500",
    balance: "500"
};