const router = require("express").Router();

const { login, signup } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/authMiddleware");

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

module.exports = router;
