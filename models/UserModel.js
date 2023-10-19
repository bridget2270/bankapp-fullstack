const mongoose = require("mongoose");
const bycrypt = required("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

// check password function for specific user
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(entered, this.password);
};

// encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified(password)) {
    next();
  }

  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
