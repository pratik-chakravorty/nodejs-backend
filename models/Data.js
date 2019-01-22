const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: "Please supply a name"
  },
  description: {
    type: String,
    required: "Please supply a description"
  },
  photo: String
});

module.exports = mongoose.model("Data", dataSchema);
