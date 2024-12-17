import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phoneNumber: String,
  numberOfTravelers: Number,
  specialRequests:{
    type:String,
    required:false,
  },
  packageId: mongoose.Schema.Types.ObjectId,
  totalPrice: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;