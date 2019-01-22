const mongoose = require("mongoose");
const Data = mongoose.model("Data");

const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "This filetype isn't supported" }, false);
    }
  }
};

exports.upload = multer(multerOptions).single("photo"); //gives req.file
exports.resize = async (req, res, next) => {
  if (!req.file) return next();
  const extension = req.file.mimetype.split("/")[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  try {
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(500, jimp.AUTO);
    await photo.write(`./controllers/uploads/${req.body.photo}`);
    next();
  } catch (err) {
    console.log(err);
  }
};
exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
exports.getImage = (req, res) => {
  res.sendFile(`./uploads/${req.params.image}`, { root: __dirname });
  // res.sendFile(`../uploads/${req.params.image}`, { root: __dirname });
};
exports.putData = async (req, res) => {
  try {
    const data = new Data(req.body);
    await data.save();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

exports.updateData = async (req, res) => {
  try {
    const data = await Data.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    }).exec();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteData = async (req, res) => {
  try {
    const data = await Data.findOneAndDelete({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
