const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  role: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  experience: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, required: true },
  imgUrl: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
