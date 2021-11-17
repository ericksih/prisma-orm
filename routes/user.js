const router = require("express").Router();
const { PrismaClient } = require(".prisma/client");

const { user } = new PrismaClient(); // PrismaClient is a class that we can use to connect to our database

// GET /api/user - Get all users
router.get("/", async (req, res) => {
  // req is the request object, res is the response object
  const users = await user.findMany({
    // findMany is a method that we can use to find all users in our database
    select: {
      username: true,
    },
  });
  res.json(users); // res.json is a method that we can use to send a response to the client
});

router.post("/", async (req, res) => {
  // req is the request object, res is the response object
  const { username } = req.body; // req.body is the body of the request
  const userExists = await user.findUnique({
    // findUnique is a method that we can use to find a user in our database
    where: {
      username, // username is the name of the column in our database that we want to find
    },
    select: {
      username: true,
    },
  });

  if (userExists) {
    // if the user exists in our database already then we want to send a response to the client saying that the user already exists
    res.status(400).json({
      error: "User already exists", // status is a method that we can use to set the status code of the response
    });
  }
  const newUser = await user.create({
    // create is a method that we can use to create a user in our database
    data: {
      username, // username is the name of the column in our database that we want to create
    },
  });
  res.json(newUser); // res.json is a method that we can use to send a response to the client
});

module.exports = router;
