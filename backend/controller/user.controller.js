const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { validationResult } = require("express-validator");

module.exports = {
  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
        return res.status(400).json({ message: "User Already Exists" });
      }
      user = new User({ username, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.status(200).json({ message: "User created in the database" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  },

  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email, username });
      if (!user) return res.status(400).json({ message: "User Not Exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect Password !" });
      const payload = {
        user: { id: user.id },
      };
      jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          username: user.username,
          email: user.email,
          id: user._id,
        });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
