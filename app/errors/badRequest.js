const { StatusCodes } = require("http-status-codes");
const ResponseError = require("./responseError");

class BadRequest extends ResponseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
