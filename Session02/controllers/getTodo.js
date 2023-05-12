//import the model
const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {
  try {
    //fetch all todo items from database
    const todos = await Todo.find({});
    //response
    res.status(200).json({
      success: true,
      data: todos,
      message: "Entire Todo Data is fetched",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};

exports.getTodoByID = async (req, res) => {
  try {
    // fetch todo item based on id
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });

    // data for given id not found
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `No Data found with given id ${id}`,
      });
    }

    //data for given id found
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo ${id} data successfully fetched`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};
