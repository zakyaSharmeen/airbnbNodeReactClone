import multer from "multer";
import fs from "fs";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("Uploading file:", file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
