const express = require("express");
const router = express.Router();
const { index } = require("./controller");

router.get("/refreshToken/:refreshToken", index);

module.exports = router;
