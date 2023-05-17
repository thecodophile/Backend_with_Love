//auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //we can extract token from Header, body, cookie
    //extracyt jwt token from req body

    console.log("cookie", req.cookies.token);
    console.log("body", req.body.token);
    console.log("header", req.header("Authorization"));

    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    //if token is not present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not available",
      });
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      //to use it in next middleware
      req.user = decode;
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      status: false,
      message: "Something went wrong while verifying the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.roles !== "Student") {
      return res.status(401).json({
        status: false,
        message: "This is a protected route for students",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "User role is not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.roles !== "Admin") {
      return res.status(401).json({
        status: false,
        message: "This is a protected route for Admin",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "User role is not matching",
    });
  }
};
