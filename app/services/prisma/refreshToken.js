const { prismaClient } = require("../../db");
const { NotFound } = require("../../errors");
const {
  isRefreshTokenValid,
  createAccessToken,
  createUserToken,
} = require("../../utils");

const createUserRefreshToken = async (payload) => {
  const check = await prismaClient.userRefreshToken.findFirst({
    where: {
      userId: payload.userId,
    },
  });

  let result;

  if (check) {
    result = await prismaClient.userRefreshToken.update({
      where: {
        id: check.id,
      },
      data: {
        ...payload,
      },
    });
  } else {
    result = await prismaClient.userRefreshToken.create({
      data: {
        ...payload,
      },
    });
  }

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;

  const result = await prismaClient.userRefreshToken.findFirst({
    where: {
      token: refreshToken,
    },
  });

  if (!result) {
    throw new NotFound("Invalid refresh token");
  }

  const payload = isRefreshTokenValid({ token: result.token });
  const userCheck = await prismaClient.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  if (!userCheck) {
    throw new NotFound("Invalid refresh token");
  }

  const accessToken = createAccessToken({
    payload: createUserToken(userCheck),
  });

  return {
    accessToken,
  };
};

module.exports = {
  createUserRefreshToken,
  getUserRefreshToken,
};
