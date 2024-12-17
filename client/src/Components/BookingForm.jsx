import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const BookingForm = ({ packageDetails, isOpen, onClose, onBookingComplete }) => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    userId: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: '',
    numberOfTravelers: 1,
    specialRequests: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const bookingDetails = {
        ...formData,
        packageId: packageDetails._id,
        totalPrice: packageDetails.price * formData.numberOfTravelers,
      };

      const response = await axios.post('http://localhost:5000/api/booking', bookingDetails); // Replace with your backend API endpoint
      alert('Booking successful!');
      onBookingComplete(response.data);
      onClose(); // Close modal after successful booking
    } catch (err) {
      console.error('Error submitting booking:', err);
      alert('Failed to submit booking. Please try again.');
    }
       
    
  };

  if (!isOpen) return null; // Do not render anything if modal is not open

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">Book Package: {packageDetails.title}</h2>
        <form onSubmit={handleBookingSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Number of Travelers</label>
            <input
              type="number"
              name="numberOfTravelers"
              value={formData.numberOfTravelers}
              onChange={handleInputChange}
              min="1"
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
