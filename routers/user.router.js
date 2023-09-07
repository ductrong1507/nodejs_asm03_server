const express = require("express");
const {
  getListUser,
  createUser,
  loginUser,
} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const userRouter = express.Router();

// Get userList
userRouter.get("/", authenticate, getListUser);

// create user
userRouter.post("/register", createUser);

// login user
userRouter.post("/login", loginUser);

module.exports = userRouter;
