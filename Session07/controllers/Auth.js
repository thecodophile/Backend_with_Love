const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// signup router handler
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;

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
      role,
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
