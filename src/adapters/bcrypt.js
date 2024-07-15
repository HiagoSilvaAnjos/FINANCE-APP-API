import bcrypt from "bcrypt";

export class PasswordHasherAdapter {
    async criptograph(password) {
        return await bcrypt.hash(password, 10);
    }
}