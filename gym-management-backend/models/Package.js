const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  detail: { type: String },
  price: { type: Number, required: true },
  validity: { type: Number, required: true }, // Validity in days
  imgUrl: { type: String, required: true },
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
