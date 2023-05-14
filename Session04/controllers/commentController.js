const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user, body } = req.body;
    //create a comment obj
    const comment = new Comment({
      post,
      user,
      body,
    });
    //save the new comment into the database
    const savedComment = await comment.save();

    // add the comment id the post collection

    // find the post by ID, add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true } //return updated document
    )
      .populate("comments") //populate the comments array with comment documents
      .exec();
    //response
    res.status(200).json({
      post: updatedPost,
      message: "Comment added successfully",
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
