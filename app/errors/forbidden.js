const { StatusCodes } = require("http-status-codes");
const ResponseError = require("./responseError");

class Forbidden extends ResponseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Forbidden;
