import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDb } from "./config.js";
import packageRoutes from "./routers/package-routes.js";
import bookingRoutes from "./routers/booking-routes.js";
import userRoutes from "./routers/user-routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(bodyParser.json());


//routes
app.use('/api/packages', packageRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/users', userRoutes);


//start server
app.listen(PORT, () => {
    console.log(`Server Started at port : ${PORT}`);
    connectDb();

  });
  