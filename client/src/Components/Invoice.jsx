import React, { useRef } from "react";
import jsPDF from "jspdf";

const InvoiceModal = ({ isOpen, onClose, invoiceDetails }) => {
  const invoiceRef = useRef();

  // Function to generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF("portrait", "pt", "a4");
    doc.html(invoiceRef.current, {
      callback: (doc) => {
        doc.save("Invoice.pdf");
      },
      x: 10,
      y: 10,
    });
  };

  if (!isOpen || !invoiceDetails) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white w-11/12 max-w-3xl p-6 rounded-lg shadow-lg relative"
        ref={invoiceRef}
      >
        {/* Header */}
        <div className="text-center border-b-2 pb-4 mb-4">
          <h2 className="text-3xl font-bold text-blue-600">Invoice</h2>
          <p className="text-gray-600">Travel Agency Booking Invoice</p>
        </div>

        {/* Invoice Content */}
        <div className="space-y-4">
          <p>
            <strong>Customer Name:</strong> {invoiceDetails.invoice.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {invoiceDetails.invoice.customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {invoiceDetails.invoice.customer.phoneNumber}
          </p>
          <p>
            <strong>Package Name:</strong> {invoiceDetails.invoice.package.title}
          </p>
          <p>
            <strong>Description:</strong> {invoiceDetails.invoice.package.description}
          </p>
          <p>
            <strong>Number of Travelers:</strong>{" "}
            {invoiceDetails.invoice.numberOfTravelers}
          </p>
          <p>
            <strong>Price Per Traveler:</strong> $
            {invoiceDetails.invoice.package.price}
          </p>
          <p>
            <strong>Total Price:</strong> ${invoiceDetails.invoice.totalPrice}
          </p>
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 pt-4 mt-4">
          <p className="text-gray-600 text-sm">
            Thank you for booking with us! Have a safe trip!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
