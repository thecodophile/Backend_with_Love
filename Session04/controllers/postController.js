const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });

    const savedPost = await post.save();

    res.status(200).json({
      post: savedPost,
      message: "Post created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      allPosts: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: error.message,
    });
  }
};
