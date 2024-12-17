import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await login(formData);
      alert("Login successful!");
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
          Welcome Back
        </h2>
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
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
