const express = require("express");
const router = express.Router();

// baseRoute = /api/users/

// creating user -> baseRoute/
router.post("/", (req, res) => {
  console.log("create user");
});

// login user -> baseRoute/login
router.post("/login", (req, res) => {
  console.log("login user");
});

// deposit -> baseRoute/deposit
router.put("/deposit", (req, res) => {
  console.log("deposit");
});

// withdraw -> baseRoute/withdraw
router.put("/withdraw", (req, res) => {
  console.log("withdraw");
});

module.exports = router;
