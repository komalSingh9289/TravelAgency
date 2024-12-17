import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "./BookingForm";
import InvoiceModal from "./Invoice";

const PackageDetails = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const handleBookingComplete = (details) => {
    setInvoiceDetails(details);
    console.log(invoiceDetails);
    
    setIsInvoiceModalOpen(true);
  };

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/packages/${id}`
        );
        setPackageDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package details:", error);
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading package details...</div>;
  }

  if (!packageDetails) {
    return (
      <div className="text-center py-10 text-red-500">Package not found.</div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4">{packageDetails.title}</h2>
        <img
          src={packageDetails.image || "https://via.placeholder.com/600"}
          alt={packageDetails.title}
          className="w-full h-96 object-cover mb-6 rounded-lg"
        />
        <p className="text-gray-700 mb-4">{packageDetails.description}</p>
        <p className=" text-lg mb-6 text-gray-700">
          Price:{" "}
          <span className="text-blue-500 font-bold">
            ${packageDetails.price}
          </span>
        </p>
        <p className="text-gray-500">
          Available Dates:{" "}
          <span className="text-blue-500 font-semibold">
            {packageDetails.availableDates.join(", ")}
          </span>
        </p>

        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Book Now
        </button>
      </div>

      <BookingForm
        packageDetails={packageDetails}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookingComplete={ handleBookingComplete}
      />

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoiceDetails={invoiceDetails}
      />
    </>
  );
};

export default PackageDetails;
