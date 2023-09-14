const express = require("express");
const {
  getListClient,
  createUser,
  loginUser,
} = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const userRouter = express.Router();

// create user
userRouter.post("/register", createUser);

// login user
userRouter.post("/login", loginUser);

// Get client list
userRouter.get("/client/:userId", authenticate, authorize, getListClient);

module.exports = userRouter;
