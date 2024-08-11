const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  jwtAccessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
};
