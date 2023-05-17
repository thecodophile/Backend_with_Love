const router = require("express").Router();

const { login, signup } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/authMiddleware");

const User = require("../models/userModel");

router.post("/login", login);
router.post("/signup", signup);

// testing protected routes for single middleware
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Testing",
  });
});

//protected route
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Admin",
  });
});

// router.get("/getEmail", auth, async (req, res) => {
//   try {
//     const id = req.user.id;
//     const user = await User.findById(id);

//     res.status(200).json({
//       success: true,
//       User: user,
//       message: "Welcome to the email route",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//       message: "issue in email route",
//     });
//   }
// });

module.exports = router;
