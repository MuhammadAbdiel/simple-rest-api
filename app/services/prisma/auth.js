const bcrypt = require("bcrypt");
const { prismaClient } = require("../../db");
const { validate } = require("../../validations");
const { signupSchema, signinSchema } = require("../../validations/auth");
const { BadRequest, Unauthorized } = require("../../errors");
const {
  createAccessToken,
  createRefreshToken,
  createUserToken,
} = require("../../utils");
const { createUserRefreshToken } = require("./refreshToken");

const signup = async (req) => {
  const signupRequest = validate(signupSchema, req);

  const totalUserWithSameEmail = await prismaClient.user.count({
    where: {
      email: signupRequest.email,
    },
  });

  if (totalUserWithSameEmail > 0) {
    throw new BadRequest("Email already in use");
  }

  signupRequest.password = await bcrypt.hash(signupRequest.password, 10);

  const user = await prismaClient.user.create({
    data: signupRequest,
  });

  return user;
};

const signin = async (req) => {
  const signinRequest = validate(signinSchema, req);

  const user = await prismaClient.user.findUnique({
    where: {
      email: signinRequest.email,
    },
  });

  if (!user) {
    throw new Unauthorized("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    signinRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Unauthorized("Invalid credentials");
  }

  const accessToken = createAccessToken({ payload: createUserToken(user) });
  const refreshToken = createRefreshToken({ payload: createUserToken(user) });

  await createUserRefreshToken({ token: refreshToken, userId: user.id });

  return { accessToken, refreshToken };
};

module.exports = {
  signup,
  signin,
};
