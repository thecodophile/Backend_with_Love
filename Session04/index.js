const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware json body parser
app.use(express.json());

//Activate the server
app.listen(PORT, () => {
  console.log(`App is running successfully at port ${PORT}`);
});

//Default Route
app.get("/", (req, res) => {
  res.send({
    status: "ok",
    message: "This is the Home page",
  });
});

//import Routes
const blog = require("./routes/blog");
// mount
app.use("/api/v1", blog);

// db connection
const dbConnect = require("./config/database");
dbConnect();
