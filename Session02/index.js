const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 6000;

// middleware to parse json request body
app.use(express.json());

// import routes for ToDo api
const todoRoutes = require("./routes/todo");
// mount the todo api routes
app.use("/api/v1", todoRoutes);

//start server
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

// connect to the database
const dbConnect = require("./config/database");
dbConnect();

// default Route
app.get("/", (req, res) => {
  res.json({
    status: "Ok",
    message: "This is Home page baby",
  });
});
