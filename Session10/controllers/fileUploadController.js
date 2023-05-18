const File = require("../models/File");

// localFileUpload -> handler function

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file from req
    const file = req.files.file;
    console.log("File data", file);

    //create path where file need to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH", path);

    //add path to the move function
    file.mv(path, (err) => {
      console.log("error", err);
    });

    res.status(200).json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "local file upload issue",
    });
  }
};
