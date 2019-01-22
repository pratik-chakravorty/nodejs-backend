const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "variable.env" });
//mongodb
const mongoose = require("mongoose");
require("./models/Data");
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.log(`Error: ${err.message}`);
});

const router = require("./routes/index");
const app = express();
app.use(express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
