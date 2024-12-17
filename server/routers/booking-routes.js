import express from "express";
import Package from "../models/package-model.js";
import Booking from "../models/booking-model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
      packageId,
    } = req.body;

    if (!userId || !name || !email || !phoneNumber || !numberOfTravelers || !packageId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const travelPackage = await Package.findById(packageId);
    if (!travelPackage)
      return res.status(404).json({ message: "Package not found" });

    const totalPrice = travelPackage.price * numberOfTravelers;

    const booking = new Booking({
      userId,
      name,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
      packageId,
      totalPrice,
    });

    await booking.save();

    res.json({
      message: "Booking successful",
      invoice: {
        customer: { name, email, phoneNumber },
        package: {
          title: travelPackage.title,
          description: travelPackage.description,
          price: travelPackage.price,
        },
        numberOfTravelers,
        totalPrice,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: err.message });
  }
});

export default router;
