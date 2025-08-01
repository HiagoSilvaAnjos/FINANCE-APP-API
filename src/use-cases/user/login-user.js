import { IvalidPasswordError, UserNotFoundError } from "../../errors/user";

export class LoginUserUseCase {
  constructor(
    getUserByEmailRepository,
    passwordComparatorAdapter,
    tokenGeneratorAdapter
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.passwordComparatorAdapter = passwordComparatorAdapter;
    this.tokenGeneratorAdapter = tokenGeneratorAdapter;
  }

  async execute({ email, password }) {
    // Verificaremos se o email é válido (se há usuário com esse email)
    const user = await this.getUserByEmailRepository.execute(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    // Verificaremos se a senha está correta para o usuário com esse email
    const isPasswordValid = await this.passwordComparatorAdapter.execute(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new IvalidPasswordError();
    }

    // depois, gerar os tokens
    return {
      ...user,
      tokens: this.tokenGeneratorAdapter.execute(user.id),
    };
  }
}
