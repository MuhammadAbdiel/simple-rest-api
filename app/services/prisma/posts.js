const { prismaClient } = require("../../db");
const { NotFound } = require("../../errors");
const { validate } = require("../../validations");
const { postsSchema } = require("../../validations/posts");

const getAllPosts = async (req) => {
  let condition = {};
  let { page = 1, limit = 10, search } = req;

  if (search) {
    condition = {
      ...condition,
      title: {
        search,
      },
    };
  }

  page = parseInt(page);
  limit = parseInt(limit);

  const posts = await prismaClient.post.findMany({
    relationLoadStrategy: "join",
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    where: condition,
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    posts,
    pages: Math.ceil(posts.length / limit),
    total: posts.length,
  };
};

const getPostById = async (req) => {
  const post = await prismaClient.post.findUnique({
    relationLoadStrategy: "join",
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    where: {
      id: req.params.id,
    },
  });

  if (!post) {
    throw new NotFound("Post not found");
  }

  return post;
};

const createPost = async (req) => {
  const postRequest = validate(postsSchema, req.body);

  const post = await prismaClient.post.create({
    data: {
      ...postRequest,
      authorId: req.user.userId,
    },
  });

  return post;
};

const updatePost = async (req) => {
  const postRequest = validate(postsSchema, req.body);

  const findPostById = await prismaClient.post.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!findPostById) {
    throw new NotFound("Post not found");
  }

  const post = await prismaClient.post.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...postRequest,
      authorId: req.user.userId,
    },
  });

  return post;
};

const deletePost = async (req) => {
  const findPostById = await prismaClient.post.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!findPostById) {
    throw new NotFound("Post not found");
  }

  const post = await prismaClient.post.delete({
    where: {
      id: req.params.id,
    },
  });

  return post;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
