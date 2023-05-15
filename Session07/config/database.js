const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Issue in DB Connection");
      console.error(e.message);
      process.exit(1);
    });
};
