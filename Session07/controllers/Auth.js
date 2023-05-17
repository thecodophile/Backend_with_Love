const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup router handler
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, roles } = req.body;

    // check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: "false",
        message: "User already exist",
      });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }
    // create entry for user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    //response
    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "User cannot registered, please try again later",
    });
  }
};

// login router handler
exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;

    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    //user is existing or not check
    let user = await User.findOne({ email });

    //if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User in not registered",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      roles: user.roles,
    };

    //verify password and generate a jwt token
    if (await bcrypt.compare(password, user.password)) {
      // password matched

      // create a jwt token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 + 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in successfully",
      });
    } else {
      // password do not matched
      return res.status(403).json({
        success: false,
        message: "password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failure server error",
    });
  }
};
