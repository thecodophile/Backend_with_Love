//app create
const express = require("express");
const app = express();

//port find out
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware add
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload()); //middleware for upload files to server

//db connect
const db = require("./config/database");
db.connect();

//cloudinary connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

//activate server
app.listen(PORT, () => {
  console.log("App is running at port", PORT);
});

//default route
app.get("/", (req, res) => {
  res.json({
    success: "ok",
    message: "This is Home page",
  });
});
