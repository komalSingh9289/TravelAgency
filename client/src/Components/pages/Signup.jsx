import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData);
      alert("Signup successful!");
      console.log(res);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      })
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert("Signup failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
          Create an Account
        </h2>
        <p className="text-xs text-gray-700 text-center">Already have an Account? <NavLink to={'/login'} className="text-blue-500">Login</NavLink>  </p>
        <div className="mb-4">
          <label className="block text-sm text-gray-600" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
        >
          Sign Up
        </button>
      </form>
      
    </div>
  );
};

export default Signup;
