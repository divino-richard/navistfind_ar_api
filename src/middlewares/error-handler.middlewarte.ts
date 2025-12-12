import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Error caught:", err);

  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  if (err.name === "PrismaClientKnownRequestError") {
    res.status(400).json({
      status: "fail",
      message: "Database error occurred",
      code: err.code,
    });
    return;
  }

  if (err.name === "ZodError") {
    res.status(400).json({
      status: "fail",
      message: "Validation failed",
      errors: err.issues,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
