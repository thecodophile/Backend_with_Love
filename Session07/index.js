const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").dbConnect();

const user = require("./routes/user");
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.json({
    status: "Ok",
    message: "This is the Home page",
  });
});

app.listen(PORT, () => {
  console.log(`App is listining on port ${PORT}`);
});
