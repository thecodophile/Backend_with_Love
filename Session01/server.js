// Server Initiation
const express = require("express");
const app = express();

// middleware- bodyparser
const bodyParser = require("body-parser");
// specifically parse JSON data & add it to the request.body object
app.use(bodyParser.json());

//Server Listening
app.listen(4000, () => {
  console.log("Listening on port: 4000");
});

//Router Creation
app.get("/", (req, res) => {
  res.send("Hello ji");
});

app.post("/api/cars", (req, res) => {
  const { name, brand } = req.body;
  console.log(name, brand);
  res.send("Car Submitted Successfully");
});

// MongoDB connection
const mongoose = require("mongoose");
// const mongoUri = "mongodb://localhost:27017/Cars";  //in case for me this throw error- MongooseServerSelectionError
const mongoUri = "mongodb://127.0.0.1:27017/Cars"; //so i did like this and it works

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((e) => {
    console.log("Recieved an error", e);
  });
