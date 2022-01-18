let multer = require("multer");

let upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      done(null, true);
    } else {
      var newError = new Error("Invalid file type");
      (newError.name = "MulterError"), done(newError, false);
    }
  },
});

module.exports = upload;
