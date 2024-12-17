import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Get the logged-in user context
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (e)=>{
    e.preventDefault();
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <NavLink to="/" className="hover:text-gray-200">
            Travel Agency
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="hover:text-gray-200">
            Home
          </NavLink>
          <NavLink to="/packages" className="hover:text-gray-200">
            Packages
          </NavLink>
          <NavLink to="/about" className="hover:text-gray-200">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:text-gray-200">
            Contact
          </NavLink>
          {user ? (
            user.role === 'admin' ? (
              <NavLink to="/dashboard" className="hover:text-gray-200">
                Dashboard
              </NavLink>
            ) : (
              <button onClick={handleLogout} className="hover:text-gray-200">
                Logout
              </button>
            )
          ) : (
            <NavLink to="/signup" className="hover:text-gray-200">
              Signup
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-white focus:outline-none"
          id="menu-toggle"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-blue-800 text-white px-4 py-2 transition-all duration-300 ease-in-out"
          id="mobile-menu"
        >
          <NavLink to="/" className="block py-2 hover:text-gray-200">
            Home
          </NavLink>
          <NavLink to="/packages" className="block py-2 hover:text-gray-200">
            Packages
          </NavLink>
          <NavLink to="/about" className="block py-2 hover:text-gray-200">
            About
          </NavLink>
          <NavLink to="/contact" className="block py-2 hover:text-gray-200">
            Contact
          </NavLink>
          {user ? (
            user.role === 'admin' ? (
              <NavLink
                to="/dashboard"
                className="block py-2 hover:text-gray-200"
              >
                Dashboard
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="block py-2 hover:text-gray-200"
              >
                Logout
              </button>
            )
          ) : (
            <NavLink to="/signup" className="block py-2 hover:text-gray-200">
              Signup
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
