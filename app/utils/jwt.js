const jwt = require("jsonwebtoken");
const {
  jwtAccessTokenExpiration,
  jwtAccessTokenSecret,
  jwtRefreshTokenExpiration,
  jwtRefreshTokenSecret,
} = require("../config");

const createAccessToken = ({ payload }) => {
  return jwt.sign(payload, jwtAccessTokenSecret, {
    expiresIn: jwtAccessTokenExpiration,
  });
};

const createRefreshToken = ({ payload }) => {
  return jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn: jwtRefreshTokenExpiration,
  });
};

const isAccessTokenValid = ({ token }) =>
  jwt.verify(token, jwtAccessTokenSecret);

const isRefreshTokenValid = ({ token }) =>
  jwt.verify(token, jwtRefreshTokenSecret);

module.exports = {
  createAccessToken,
  createRefreshToken,
  isAccessTokenValid,
  isRefreshTokenValid,
};
