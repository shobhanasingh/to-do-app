const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

//Register
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User Created" });
  } catch (e) {
    res.status(400).send({ error: "User already exists" });
  }
});

//Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).send({ error: "Invalid Credentials" });
  }
  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1d" });
  res.send({ token });
});
module.exports = router;
