import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PackageLists = () => {
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [newPackage, setNewPackage] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: '',
  });
  const [image, setImage] = useState(null); // Separate state for image file

  // Fetch Packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        setPackages(res.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  // Handle Add/Edit Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPackage({ ...newPackage, [name]: value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the selected file to state
  };

  // Add New Package
  const handleAddPackage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newPackage.title);
    formData.append('description', newPackage.description);
    formData.append('price', newPackage.price);
    formData.append('availableDates', newPackage.availableDates);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/packages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPackages([...packages, res.data]);
      setNewPackage({ title: '', description: '', price: '', availableDates: '' });
      setImage(null);
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };

  // Update Package
  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newPackage.title);
    formData.append('description', newPackage.description);
    formData.append('price', newPackage.price);
    formData.append('availableDates', newPackage.availableDates);
    if (image) formData.append('image', image);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/packages/admin/packages/${editingPackage._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setPackages(
        packages.map((pkg) => (pkg._id === editingPackage._id ? res.data : pkg))
      );
      setEditingPackage(null);
      setNewPackage({ title: '', description: '', price: '', availableDates: '' });
      setImage(null);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  // Delete Package
  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/packages/admin/removePackages/${id}`);
      setPackages(packages.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Packages</h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}
        className="mb-4"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Package Title"
            value={newPackage.title}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            name="description"
            placeholder="Package Description"
            value={newPackage.description}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newPackage.price}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            name="availableDates"
            placeholder="Available Dates"
            value={newPackage.availableDates}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingPackage ? 'Update Package' : 'Add Package'}
        </button>
      </form>

      {/* Packages Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg._id}>
              <td className="border border-gray-300 p-2">{pkg.title}</td>
              <td className="border border-gray-300 p-2">{pkg.description}</td>
              <td className="border border-gray-300 p-2">${pkg.price}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => {
                    setEditingPackage(pkg);
                    setNewPackage(pkg);
                  }}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePackage(pkg._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageLists;
