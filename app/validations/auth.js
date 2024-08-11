const { z } = require("zod");

const signupSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(1).max(255),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(255),
});

module.exports = {
  signupSchema,
  signinSchema,
};
