const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Firdie",
      email: "abdielfirdie@gmail.com",
      password: bcrypt.hashSync("password", 10),
    },
  });

  await prisma.post.create({
    data: {
      title: "Hello World",
      content: "This is my first post",
      published: true,
      authorId: user.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
