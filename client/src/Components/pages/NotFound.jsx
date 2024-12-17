import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
      <NavLink
        to="/"
        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </NavLink>
    </div>
  );
};

export default NotFound;
