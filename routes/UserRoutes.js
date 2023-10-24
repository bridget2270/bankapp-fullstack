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
      id: user._id,
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
    console.log("PASSWORD MATCH", passwordMatch);
    if (passwordMatch) {
      res.status(200).json({
        id: user._id,
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
router.put("/deposit", async (req, res) => {
  await transaction(req, res, "Deposit");
});

// withdraw -> baseRoute/withdraw
router.put("/withdraw", async (req, res) => {
  await transaction(req, res, "Withdrawal");
});

// get all users -> baseRoute/users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

async function transaction(req, res, type) {
  const { amount, id } = req.body;

  // find user
  const user = await User.findById(id);

  if (user) {
    if (amount > 0) {
      if (type === "Deposit") user.balance += amount;
      else {
        if (user.balance > amount) {
          user.balance -= amount;
        } else {
          return res.json({
            message:
              "Withdrawal cannot proceed, your amount must be less than your balance",
          });
        }
      }

      const updatedUser = await user.save();

      res.status(200).json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        balance: updatedUser.balance,
      });
    } else {
      res.json({ message: type + " Amount must be greater than $0" });
    }
  } else {
    res.json({ message: "User not found" });
  }
}

module.exports = router;
