import bcrypt from "bcrypt";

export class PasswordHasherAdapter {
    criptograph(password) {
        return bcrypt.hash(password, 10);
    }
}