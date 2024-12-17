import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/pages/Home";
import PackageDetails from "./Components/PackageDetails";
import Tours from "./Components/pages/Tours";
import NotFound from "./Components/pages/NotFound";
import Signup from "./Components/pages/Signup";
import Login from "./Components/pages/Login";
import Dashboard from "./Components/pages/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Bookings from "./Components/pages/Bookings";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path="/packages/" element={<Tours />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          {/* Catch-All Route for 404 */}
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
