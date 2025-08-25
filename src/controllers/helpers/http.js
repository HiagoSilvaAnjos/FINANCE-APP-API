export const badRequest = (body) => ({
  statusCode: 400,
  body,
});

export const created = (body) => ({
  statusCode: 201,
  body,
});

export const Unauthorized = () => ({
  statusCode: 401,
  body: {
    message: "Unauthorized",
  },
});

export const forbidden = () => ({
  statusCode: 403,
  body: {
    message: "Forbidden",
  },
});

export const serverError = () => ({
  statusCode: 500,
  body: {
    errorMessage: "Internal server error",
  },
});

export const ok = (body) => ({
  statusCode: 200,
  body,
});

export const notFound = (body) => ({
  statusCode: 404,
  body,
});

export const userNotFoundResponse = () => ({
  statusCode: 404,
  body: {
    message: "User not found",
  },
});

export const transactionNotFoundResponse = () => ({
  statusCode: 404,
  body: {
    message: "transaction not found",
  },
});
