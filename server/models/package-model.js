import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  availableDates: [String],
  image: String,
});

const Package = mongoose.model("Package", packageSchema);

export default Package ;