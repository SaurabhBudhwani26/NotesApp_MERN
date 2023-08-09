const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  createCheckSchema,
} = require("express-validator/src/middlewares/schema");
const fetchUser = require("../middleware/fetchUser")

const JWT_SECRET = "You will not be able to find the secret";
// Create a user using post: /auth. Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    // Check weather the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      res.send(user);

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json(authToken);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    // .then(user => res.json(user))
    // .catch(err => console.log(err))
    // res.json({message: err.message})
  }
);

// authenticate a user

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false 
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({success, authToken});



    } catch (error) {
      console.log(error.message)
      res.status(500).json("Internal Server Error");
    }
  }
);

//Getting logged in user details. Login Required
router.post("/getuser", fetchUser, async (req, res) => {

try{
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
}catch(error){
  console.log(error.message)
  res.status(500).json("Internal Server Error");
}


});



module.exports = router;
