const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

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

function isFileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);

  options.resource_type = "auto"; //when try to upload video files got error and to fix that add this line and this worked

  if (quality) {
    options.quality = quality;
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("filetype: ", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    //if file format supported
    const response = await uploadFileToCloudinary(file, "codophile");
    console.log(response);

    // entry save on db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response?.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response?.secure_url,
      message: "Image successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong when upload image file",
    });
  }
};

// video upload handler
exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log(file);

    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("filetype: ", fileType);

    //Homework: add a upper limit of 5mb for videos
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    //if file format supported
    const response = await uploadFileToCloudinary(file, "codophile");
    console.log(response);

    // entry save on db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response?.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response?.secure_url,
      message: "Video successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong when upload video file",
    });
  }
};

//imageSizeReducer handler
exports.imageSizeReducer = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("filetype: ", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    //if file format supported
    const response = await uploadFileToCloudinary(file, "codophile", 30);
    console.log(response);

    // entry save on db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response?.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response?.secure_url,
      message: "Image successfully uploaded after reduce the quality",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong when upload reduce image file",
    });
  }
};
