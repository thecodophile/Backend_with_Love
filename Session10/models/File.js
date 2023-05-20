const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware
fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);

    //transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //send mail
    let info = await transporter.sendMail({
      from: "Codophile -by Somnath",
      to: doc.email,
      subject: "New file uploaded on Cloudinary",
      html: `<h2>Hello Jee</h2> <p>File Uploaded View Here: <a href="${doc.imageUrl}">Link</a> </p>`,
    });

    console.log("Info", info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
