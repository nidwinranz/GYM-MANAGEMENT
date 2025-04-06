const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Foreign key reference to User
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: false,
  }, // Foreign key reference to Product
  name: { type: String, required: true },
  cardNo: { type: String, required: true },
  cvv: { type: String, required: true },
  expireDate: { type: String, required: true },
  expiremonth: { type: String, required: true },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
