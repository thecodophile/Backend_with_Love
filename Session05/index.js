const express = require("express");
const app = express();

// middleware
app.use(express.json());

app.listen(3000, () => {
  console.log("App listining on port 3000");
});

app.get("/", (req, res) => {
  res.json({
    status: "Ok",
    message: "This is Home page",
  });
});

app.post("/car", (req, res) => {
  res.json({
    status: "ok",
    message: "This is a post request",
  });
});
