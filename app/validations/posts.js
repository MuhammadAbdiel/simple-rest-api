const { z } = require("zod");

const postsSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
  published: z.boolean(),
});

const queryGetPostsSchema = z.object({
  page: z.optional(),
  limit: z.optional(),
});

module.exports = {
  postsSchema,
  queryGetPostsSchema,
};
