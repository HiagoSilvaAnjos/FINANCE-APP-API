import { LoginUserUseCase } from "./login-user";
import { user } from "../../tests/fixtures/user.js";
import { IvalidPasswordError, UserNotFoundError } from "../../errors/user";

describe("LoginUSerUseCase", () => {
  class GetUserByEmailRepositoryStub {
    async execute() {
      return user;
    }
  }

  class PasswordComparatorAdapterStub {
    async execute() {
      return true;
    }
  }

  class TokenGeneratorAdapterStub {
    execute() {
      return {
        accessToken: "any_token",
        refreshToken: "any_token",
      };
    }
  }

  const makeSut = () => {
    const getUserByEmailRepositoryStub = new GetUserByEmailRepositoryStub();
    const passwordComparatorAdapterStub = new PasswordComparatorAdapterStub();
    const tokenGeneratorAdapterStub = new TokenGeneratorAdapterStub();
    const sut = new LoginUserUseCase(
      getUserByEmailRepositoryStub,
      passwordComparatorAdapterStub,
      tokenGeneratorAdapterStub
    );

    return {
      sut,
      getUserByEmailRepositoryStub,
      passwordComparatorAdapterStub,
      tokenGeneratorAdapterStub,
    };
  };

  it("Should throw UserNotFoundError if user is not found", async () => {
    const { sut, getUserByEmailRepositoryStub } = makeSut();
    import.meta.jest
      .spyOn(getUserByEmailRepositoryStub, "execute")
      .mockResolvedValueOnce(null);

    const promise = sut.execute("any_email", "any_password");
    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });

  it("Should throw IvalidPasswordError if password is invalid", async () => {
    const { sut, passwordComparatorAdapterStub } = makeSut();
    import.meta.jest
      .spyOn(passwordComparatorAdapterStub, "execute")
      .mockReturnValue(false);

    const promise = sut.execute("any_email", "any_password");
    await expect(promise).rejects.toThrow(new IvalidPasswordError());
  });

  it("Should return user with tokens on success", async () => {
    const { sut } = makeSut();
    const results = await sut.execute("any_email", "any_password");
    expect(results.tokens.accessToken).toBeDefined();
  });
});
