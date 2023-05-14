const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connection is successful");
    })
    .catch((e) => {
      console.log("Issue in DB Connection");
      console.error(e.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
