import React, { useEffect, useState } from 'react'
import axios from "axios";
import { NavLink } from 'react-router-dom';

const Tours = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/packages');
        setPackages(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError('Failed to load packages. Please try again later.');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading packages...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Available Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={pkg.image || 'https://via.placeholder.com/300'}
                alt={pkg.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                <p className="text-gray-700 mb-4">{pkg.description}</p>
                <p className="text-blue-500 font-bold">${pkg.price}</p>
                <NavLink
                  to={`/packages/${pkg._id}`}
                  className="block mt-4 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tours