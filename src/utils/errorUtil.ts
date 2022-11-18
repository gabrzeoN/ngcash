type AppErrorTypes = "bad_request" |
  "unauthorized" |
  "forbidden" |
  "not_found" |
  "not_acceptable" |
  "conflict" |
  "wrong_schema";

export interface AppError {
  type: AppErrorTypes;
  message: string;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  if (type === "bad_request") return 400;
  if (type === "unauthorized") return 401;
  if (type === "forbidden") return 403;
  if (type === "not_found") return 404;
  if (type === "not_acceptable") return 406;
  if (type === "conflict") return 409;
  if (type === "wrong_schema") return 422;
  return 400;
}

export function badRequestError(message?: string): AppError {
  return { type: "bad_request", message: message ?? "" };
}

export function notAcceptableError(message?: string): AppError {
  return { type: "not_acceptable", message: message ?? "" };
}

export function forbiddenError(message?: string): AppError {
  return { type: "forbidden", message: message ?? "" };
}

export function conflictError(message?: string): AppError {
  return { type: "conflict", message: message ?? "" };
}

export function notFoundError(message?: string): AppError {
  return { type: "not_found", message: message ?? "" };
}

export function unauthorizedError(message?: string): AppError {
  return { type: "unauthorized", message: message ?? "" };
}

export function wrongSchemaError(message?: string): AppError {
  return { type: "wrong_schema", message: message ?? "" };
}
