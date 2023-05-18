const router = require("express").Router();

const { localFileUpload } = require("../controllers/fileUploadController");

router.post("/localFileUpload", localFileUpload);

module.exports = router;
