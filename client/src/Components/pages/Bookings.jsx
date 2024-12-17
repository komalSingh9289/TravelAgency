import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
  {/* 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get("/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        setError("Failed to load bookings. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  */}

    const handleClick = (e)=>{
        e.preventDefault();
        logout();
        navigate('/');
    }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-lg">Hi, {user.name}</h2>
        <button className="bg-blue-500 " onClick={handleClick}>Logout</button>
      {/*
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          My Bookings
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {booking.packageName}
                </h3>
                <p className="text-gray-600">Date: {booking.date}</p>
                <p className="text-gray-600">
                  Guests: {booking.numberOfGuests}
                </p>
                <p className="text-gray-600">Price: ${booking.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
       */}
    </div>
  );
};

export default Bookings;
