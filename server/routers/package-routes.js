import express from "express";
import Package from "../models/package-model.js";

const router = express.Router();

//get all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving packages", error: err.message });
  }
});

//get specific package
router.get("/:id", async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id);
    if (!travelPackage)
      return res.status(404).json({ message: "Package not found" });
    res.status(200).json(travelPackage);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving package", error: err.message });
  }
});

//admin routes for packages

//add new package
router.post("/admin/packages", async (req, res) => {
  try {
    const { title, description, price, availableDates, image } = req.body;

    if (!title || !description || !price || !availableDates || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPackage = new Package({
      title,
      description,
      price,
      availableDates,
      image,
    });
    await newPackage.save();
    res.json({ message: "Package added successfully", package: newPackage });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding package", error: err.message });
  }
});

//update a package
router.put('/admin/packages/:id', async(req,res)=>{
    try {
        const { title, description, price, availableDates, image } = req.body;
    
        const updatedPackage = await Package.findByIdAndUpdate(
          req.params.id,
          { title, description, price, availableDates, image },
          { new: true, runValidators: true }
        );
    
        if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
    
        res.json({ message: 'Package updated successfully', package: updatedPackage });
      } catch (err) {
        res.status(500).json({ message: 'Error updating package', error: err.message });
      }
});

//delete a package
router.delete('/admin/removePackages/:id', async (req,res)=>{
    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id);
        if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
    
        res.json({ message: 'Package deleted successfully', package: deletedPackage });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting package', error: err.message });
      }
})

export default router;
