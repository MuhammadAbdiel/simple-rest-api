const { StatusCodes } = require("http-status-codes");
const ResponseError = require("./responseError");

class NotFound extends ResponseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
