const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.get("/get", apiController.getData);
router.post(
  "/put",
  apiController.upload,
  apiController.resize,
  apiController.putData
);
router.put(
  "/data/:id",
  apiController.upload,
  apiController.resize,
  apiController.updateData
);
router.get("/controllers/uploads/:image", apiController.getImage);
router.delete("/data/:id", apiController.deleteData);

module.exports = router;
