const { StatusCodes } = require("http-status-codes");
const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // Error from Zod
  if (err instanceof ZodError) {
    customError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    customError.msg = err.issues.map((issue) => issue.message).join(", ");
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = "Duplicate value";
  }

  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.msg = "Invalid ID";
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
