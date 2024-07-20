const express = require("express");
const router =  express.Router();
const cropImage_controller = require("./../controllers/cropImage.js");
const { cropImage } = require("./../middlewares/upload.js")

// routes for slider ---------------------------------
router.get("/cropImage",cropImage_controller.show.bind(cropImage_controller));
router.post("/cropImage",cropImage.single("image"),cropImage_controller.add.bind(cropImage_controller));
router.delete("/cropImage/:id",cropImage_controller.delete.bind(cropImage_controller));
// -----------------------------------------------------



module.exports = router;
