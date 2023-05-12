// import the model
const Todo = require("../models/Todo");

// define route handler

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete({ _id: id });

    res.json({
      success: true,
      message: "Todo Deleted",
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
