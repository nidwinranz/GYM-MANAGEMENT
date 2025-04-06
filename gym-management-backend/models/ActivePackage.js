const mongoose = require("mongoose");

const activePackageSchema = new mongoose.Schema({
  active: { type: Boolean, default: false }, // Add active field with default value true
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const ActivePackage = mongoose.model("ActivePackage", activePackageSchema);
module.exports = ActivePackage;
