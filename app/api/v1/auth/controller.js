const { StatusCodes } = require("http-status-codes");
const { signin, signup } = require("../../../services/prisma/auth");

const signUp = async (req, res, next) => {
  try {
    const user = await signup(req.body);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await signin(req.body);

    res.status(StatusCodes.OK).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
};
