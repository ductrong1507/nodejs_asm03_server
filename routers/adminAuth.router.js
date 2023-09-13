const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { loginAdmin } = require("../controllers/adminAuth.controller");

const adminAuthRouter = express.Router();

// đăng nhập ở admin
adminAuthRouter.get("/login", loginAdmin);

module.exports = adminAuthRouter;
