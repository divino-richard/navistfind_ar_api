import { createError } from "./utils/error";

export const Errors = {
  badRequest: (msg = "Bad Request") => createError(msg, 400),
  unauthorized: (msg = "Unauthorized") => createError(msg, 401),
  notFound: (msg = "Not Found") => createError(msg, 404),
  conflict: (msg = "Conflict") => createError(msg, 409),
};
