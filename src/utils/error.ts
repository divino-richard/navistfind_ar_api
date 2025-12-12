export const createError = (
  message: string,
  statusCode = 500,
  options = {}
) => ({
  message,
  statusCode,
  isOperational: true,
  ...options,
});
