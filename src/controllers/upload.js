const sharp = require("sharp");
const fs = require("fs");

const uploadSingle = async (req, res) => {
  console.log(req.headers.host);
  try {
    fs.access("./uploads", (error) => {
      if (error) {
        fs.mkdirSync("./uploads");
      }
    });
    if (!req.file)
      return res.status(400).json({ msg: "choose file to upload" });
    const { buffer, originalname } = req.file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname}.webp`;
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile("./uploads/" + ref);
    const link = `${req.headers.host}/${ref}`;
    return res.json({ link });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
module.exports = { uploadSingle };
