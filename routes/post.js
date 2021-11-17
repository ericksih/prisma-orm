const router = require("express").Router();
const { PrismaClient } = require(".prisma/client");

const { user, post } = new PrismaClient(); // PrismaClient is a class that we can use to connect to our database

router.post("/", async (req, res) => {
  const { title, content, user_id } = req.body;

  const userExists = await user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!userExists) {
    res.status(400).json({
      error: "User does not exist",
    });
  }

  const newPost = await post.create({
    // create is a method that we can use to create a post in our database
    data: {
      // data is a property that we can use to create a post in our database
      title,
      post: content, // post is the name of the column in our database that we want to create
      user_id, // user_id is the name of the column in our database that we want to create
    },
  });

  res.json(newPost);
});

router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  let posts = await post.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      title: true,
      post: true,
      createdAt: true,
      user_id: true,
    },
  });

  if (posts.length === 0) {
    res.status(400).json({
      error: "User does not have any posts",
    });
  }

  res.json(posts);
});

module.exports = router;
