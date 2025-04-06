const mongoose = require("mongoose");

const packPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  paidAmount: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
});

const PackPayment = mongoose.model("PackPayment", packPaymentSchema);
module.exports = PackPayment;
