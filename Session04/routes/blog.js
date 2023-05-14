const router = require("express").Router();

// import controller
const { createComment } = require("../controllers/commentController");
const { createPost, getAllPosts } = require("../controllers/postController");
const { likePost, unlikePost } = require("../controllers/likeController");
// mapping create

router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.put("/likes/unLike", unlikePost);

// exports

module.exports = router;
