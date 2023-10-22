const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();

// baseRoute = /api/users/

// creating user -> baseRoute/
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  // create user if user doesn't already exist
  const user = await User.create({ name, email, password });

  // return user if user was created
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      token: "token here, to be used in the future",
    });
  } else {
    res.json({ message: "User not found" });
  }
});

// login user -> baseRoute/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // find one user with email
  const user = await User.findOne({ email });

  // check if user exists and passwords match
  if (user) {
    // match password
    const passwordMatch = await user.matchPassword(password);
    if (passwordMatch) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        token: "token here, to be used in the future",
      });
    } else {
      res.json({ message: "Wrong credentials" });
    }
  } else {
    res.json({ message: "User not found" });
  }
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
