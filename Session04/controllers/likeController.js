const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    const like = new Like({
      post,
      user,
    });

    const savedLike = await like.save();

    //update the post collection basis on this
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { likes: savedLike._id },
      },
      { new: true }
    )
      .populate("likes")
      .exec();
    res.status(200).json({
      post: updatedPost,
      message: "Post liked successfully",
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

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    //find and delete from like collection
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    //update the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );

    //response
    res.status(200).json({
      post: updatedPost,
      message: "post unliked successfully",
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
