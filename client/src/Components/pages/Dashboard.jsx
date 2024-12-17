import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { NavLink } from 'react-router-dom';
import PackageLists from '../PackageLists';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('packages'); // Manage active tab state

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <p className="text-sm text-gray-600">
            Access Denied. You need admin privileges to view the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto mt-6">
        <div className="flex justify-around border-b-2 pb-2">
          <button
            onClick={() => setActiveTab('packages')}
            className={`text-lg font-semibold ${
              activeTab === 'packages' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'
            }`}
          >
            Packages
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`text-lg font-semibold ${
              activeTab === 'users' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`text-lg font-semibold ${
              activeTab === 'bookings' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'
            }`}
          >
            Bookings
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'packages' && <PackageLists />}
          {activeTab === 'users' && <UserLists />}
          {activeTab === 'bookings' && <BookingLists />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
