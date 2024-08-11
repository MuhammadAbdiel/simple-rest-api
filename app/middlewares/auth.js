const { Unauthorized } = require("../errors");
const { isAccessTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new Unauthorized("Authentication invalid");
    }

    const payload = isAccessTokenValid({ token });

    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticateUser;
