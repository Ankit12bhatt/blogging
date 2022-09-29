const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {  
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const newuser = await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("in 1")
    const user = await User.findOne({ username: req.body.username });
    console.log("in 2")
    !user && res.status(400).json("Wrong credentials!");
    console.log("before pas")
    console.log("user ", user)

    const validated = await bcrypt.compare(req.body.password, user.password);
    console.log("password")
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log("error ")
    res.status(500).json(err);
  }
});

module.exports = router;
